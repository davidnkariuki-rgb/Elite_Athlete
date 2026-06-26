const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const app = express();
const PORT = 5000;
const ROOT_DIR = path.resolve(__dirname, "..");
const USERS_FILE = path.join(__dirname, "data", "users.json");

app.use(cors());
app.use(express.json());
app.use(express.static(ROOT_DIR));

async function ensureUserStore() {
    await fs.mkdir(path.dirname(USERS_FILE), { recursive: true });

    try {
        await fs.access(USERS_FILE);
    } catch {
        await fs.writeFile(USERS_FILE, "[]", "utf-8");
    }
}

async function readUsers() {
    await ensureUserStore();
    const usersJson = await fs.readFile(USERS_FILE, "utf-8");
    const parsed = JSON.parse(usersJson);
    return Array.isArray(parsed) ? parsed : [];
}

async function writeUsers(users) {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
}

function normalizeEmail(email) {
    return String(email || "").trim().toLowerCase();
}

function normalizePhone(phone) {
    return String(phone || "").replace(/\D/g, "");
}

function sanitizeUser(user) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        createdAt: user.createdAt
    };
}

app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});

app.post("/api/auth/signup", async (req, res) => {
    try {
        const name = String(req.body.name || "").trim();
        const email = normalizeEmail(req.body.email);
        const phone = normalizePhone(req.body.phone);
        const password = String(req.body.password || "");

        if (!name || !email || !phone || !password) {
            return res.status(400).json({ message: "Name, email, phone, and password are required." });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters." });
        }

        const users = await readUsers();
        const existingUser = users.find((user) => user.email === email || user.phone === phone);

        if (existingUser) {
            return res.status(409).json({ message: "An account with this email or phone already exists." });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = {
            id: crypto.randomUUID(),
            name,
            email,
            phone,
            passwordHash,
            createdAt: new Date().toISOString()
        };

        users.push(user);
        await writeUsers(users);

        return res.status(201).json({
            message: "Account created successfully.",
            user: sanitizeUser(user)
        });
    } catch (error) {
        return res.status(500).json({ message: "Failed to create account.", error: error.message });
    }
});

app.post("/api/auth/login", async (req, res) => {
    try {
        const email = normalizeEmail(req.body.email);
        const phone = normalizePhone(req.body.phone);
        const password = String(req.body.password || "");

        if (!email || !phone || !password) {
            return res.status(400).json({ message: "Email, phone, and password are required." });
        }

        const users = await readUsers();
        const user = users.find((account) => account.email === email && account.phone === phone);

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        return res.status(200).json({
            message: "Login successful.",
            user: sanitizeUser(user)
        });
    } catch (error) {
        return res.status(500).json({ message: "Failed to login.", error: error.message });
    }
});

app.get("/", (req, res) => {
    res.sendFile(path.join(ROOT_DIR, "pages", "index.html"));
});

ensureUserStore()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to initialize data store", error);
        process.exit(1);
    });
