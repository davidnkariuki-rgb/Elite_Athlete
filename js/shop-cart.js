(function () {
  const CART_STORAGE_KEY = "eliteAthleteCart";

  function canContinue(actionName) {
    if (!window.EliteAuthGuard || typeof window.EliteAuthGuard.requireLogin !== "function") {
      return true;
    }

    return window.EliteAuthGuard.requireLogin(actionName);
  }

  function loadCart() {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      const parsed = JSON.parse(raw || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }

  function formatMoney(value) {
    return `KSh ${Math.round(value).toLocaleString("en-KE")}`;
  }

  function getElements() {
    return {
      cartItemsEl: document.getElementById("cartItems"),
      cartCountEl: document.getElementById("cartCount"),
      cartSubtotalEl: document.getElementById("cartSubtotal"),
      clearCartBtn: document.getElementById("clearCartBtn"),
      checkoutBtn: document.getElementById("checkoutBtn")
    };
  }

  function getProductFromButton(button) {
    return {
      id: button.dataset.productId,
      name: button.dataset.productName,
      price: Number(button.dataset.productPrice || 0),
      image: button.dataset.productImage,
      quantity: 1
    };
  }

  function updateCartCountAndSubtotal(cart, elements) {
    const totalItems = cart.reduce(function (sum, item) {
      return sum + item.quantity;
    }, 0);

    const subtotal = cart.reduce(function (sum, item) {
      return sum + item.price * item.quantity;
    }, 0);

    elements.cartCountEl.textContent = `${totalItems} item${totalItems === 1 ? "" : "s"}`;
    elements.cartSubtotalEl.textContent = formatMoney(subtotal);
  }

  function renderCart(cart, elements) {
    if (!elements.cartItemsEl) {
      return;
    }

    if (cart.length === 0) {
      elements.cartItemsEl.innerHTML = '<li class="cart-empty">Your cart is empty. Add products to begin.</li>';
      updateCartCountAndSubtotal(cart, elements);
      return;
    }

    elements.cartItemsEl.innerHTML = cart
      .map(function (item) {
        return `
          <li class="cart-item" data-cart-id="${item.id}">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
              <h3>${item.name}</h3>
              <p>${formatMoney(item.price)}</p>
            </div>
            <div class="cart-item-actions">
              <div class="cart-qty" role="group" aria-label="Update quantity for ${item.name}">
                <button type="button" class="qty-decrease" data-cart-id="${item.id}" aria-label="Decrease quantity">-</button>
                <span>${item.quantity}</span>
                <button type="button" class="qty-increase" data-cart-id="${item.id}" aria-label="Increase quantity">+</button>
              </div>
              <button type="button" class="cart-remove" data-cart-id="${item.id}">Remove</button>
            </div>
          </li>
        `;
      })
      .join("");

    updateCartCountAndSubtotal(cart, elements);
  }

  function addToCart(cart, product) {
    const existing = cart.find(function (item) {
      return item.id === product.id;
    });

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push(product);
    }

    return cart;
  }

  function changeQuantity(cart, itemId, delta) {
    return cart
      .map(function (item) {
        if (item.id !== itemId) {
          return item;
        }

        return {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.quantity + delta
        };
      })
      .filter(function (item) {
        return item.quantity > 0;
      });
  }

  function removeItem(cart, itemId) {
    return cart.filter(function (item) {
      return item.id !== itemId;
    });
  }

  function bindProductButtons(cartState, elements) {
    const buttons = document.querySelectorAll(".add-to-cart");

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        if (!canContinue("buy products")) {
          return;
        }

        const product = getProductFromButton(button);
        cartState.cart = addToCart(cartState.cart, product);
        saveCart(cartState.cart);
        renderCart(cartState.cart, elements);
      });
    });
  }

  function bindCartActions(cartState, elements) {
    elements.cartItemsEl.addEventListener("click", function (event) {
      if (!canContinue("manage your cart")) {
        return;
      }

      const target = event.target;
      const itemId = target.dataset.cartId;

      if (!itemId) {
        return;
      }

      if (target.classList.contains("qty-increase")) {
        cartState.cart = changeQuantity(cartState.cart, itemId, 1);
      } else if (target.classList.contains("qty-decrease")) {
        cartState.cart = changeQuantity(cartState.cart, itemId, -1);
      } else if (target.classList.contains("cart-remove")) {
        cartState.cart = removeItem(cartState.cart, itemId);
      } else {
        return;
      }

      saveCart(cartState.cart);
      renderCart(cartState.cart, elements);
    });

    if (elements.clearCartBtn) {
      elements.clearCartBtn.addEventListener("click", function () {
        if (!canContinue("manage your cart")) {
          return;
        }

        cartState.cart = [];
        saveCart(cartState.cart);
        renderCart(cartState.cart, elements);
      });
    }

    if (elements.checkoutBtn) {
      elements.checkoutBtn.addEventListener("click", function () {
        if (!canContinue("checkout")) {
          return;
        }

        if (cartState.cart.length === 0) {
          alert("Your cart is empty.");
          return;
        }

        alert("Checkout flow is not connected yet. Your cart is saved locally.");
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    const elements = getElements();

    if (!elements.cartItemsEl || !elements.cartCountEl || !elements.cartSubtotalEl) {
      return;
    }

    const cartState = {
      cart: loadCart()
    };

    renderCart(cartState.cart, elements);
    bindProductButtons(cartState, elements);
    bindCartActions(cartState, elements);
  });
})();
