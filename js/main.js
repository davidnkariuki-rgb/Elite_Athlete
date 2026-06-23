document.addEventListener('DOMContentLoaded', function () {
  const bmiForm = document.getElementById('bmi-form');
  const bmiResult = document.getElementById('bmi-result');

  if (bmiForm && bmiResult) {
    bmiForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const heightCm = parseFloat(document.getElementById('height').value);
      const weightKg = parseFloat(document.getElementById('weight').value);

      if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) {
        bmiResult.textContent = 'Please enter valid height and weight values.';
        return;
      }

      const heightM = heightCm / 100;
      const bmi = weightKg / (heightM * heightM);
      const roundedBmi = bmi.toFixed(1);
      let category = '';

      if (bmi < 18.5) {
        category = 'Underweight';
      } else if (bmi < 25) {
        category = 'Normal weight';
      } else if (bmi < 30) {
        category = 'Overweight';
      } else {
        category = 'Obesity';
      }

      bmiResult.innerHTML = `<p>Your BMI is <strong>${roundedBmi}</strong>.</p><p>Category: <strong>${category}</strong>.</p>`;
    });
  }

  // Blog Modal Functionality
  const blogData = {
    1: {
      title: 'Building a Periodized Training Plan',
      meta: 'June 1, 2026 • Training',
      content: `
        <p>Periodization is one of the most effective strategies to help athletes peak at the right time and maximize performance throughout the season. By structuring your training into macro, meso, and micro cycles, you create a systematic approach that prevents plateaus and promotes continuous improvement.</p>
        
        <p><strong>Macrocycles</strong> span an entire season or year, providing the overall training framework. Mesocycles typically last 4-12 weeks and focus on specific training phases like strength building, power development, or competition preparation. Microcycles break down into weekly training blocks with varying intensities and volumes.</p>
        
        <p>The key to effective periodization is balancing hard training phases with adequate recovery periods. Progressive overload—gradually increasing training demands—ensures your body continues to adapt. This prevents overtraining and keeps your athletes motivated with visible progress.</p>
        
        <p>Elite athletes and coaches around the world use periodization because it works. Whether you're preparing for a single competition or maintaining peak performance throughout a season, understanding these cycles will transform your training results.</p>
      `
    },
    2: {
      title: 'Nutrition for Recovery',
      meta: 'May 18, 2026 • Nutrition',
      content: `
        <p>Many athletes focus intensely on their training but neglect the equally important aspect of nutrition for recovery. What you eat and when you eat it can be just as important as the workout itself. Recovery nutrition helps repair muscle tissue, replenish energy stores, and prepare your body for the next training session.</p>
        
        <p><strong>Post-workout window (30-60 minutes after training):</strong> This is the golden opportunity to accelerate recovery. Consume a meal combining protein and carbohydrates to restore glycogen levels and initiate muscle protein synthesis. A simple option might be a chicken sandwich or Greek yogurt with berries.</p>
        
        <p><strong>Throughout the day:</strong> Spread protein intake across multiple meals—aim for 1.6-2.0 grams per kilogram of body weight daily. Include nutrient-dense foods: lean meats, fish, eggs, legumes, whole grains, and plenty of vegetables for micronutrients.</p>
        
        <p><strong>Hydration matters:</strong> Replace fluids lost during training. A practical guideline is to drink 150% of your body weight loss within 4-6 hours after exercise, including electrolytes.</p>
        
        <p>Proper nutrition for recovery isn't just about eating more—it's about eating smart. With the right timing and food choices, you'll recover faster and train harder.</p>
      `
    },
    3: {
      title: 'Coach Spotlight: Training Philosophy',
      meta: 'May 5, 2026 • Coaches',
      content: `
        <p>We had the opportunity to sit down with our lead coach to discuss their approach to athlete development and what makes a truly elite training program. Here's what makes his philosophy stand out in the sports world.</p>
        
        <p><strong>"Long-term athlete development is the foundation,"</strong> he explains. Rather than focusing on short-term wins, he emphasizes building sustainable systems where athletes can improve year after year. This means investing in foundational skills, proper technique, and mental resilience early on.</p>
        
        <p>One key principle is <strong>individualization</strong>. Every athlete has unique strengths, weaknesses, and learning styles. A one-size-fits-all approach won't cut it at the elite level. Coaches must tailor programs while maintaining consistent principles across the team.</p>
        
        <p>The coach also stresses the importance of <strong>evidence-based training</strong>. While experience matters, staying updated with the latest sports science research ensures you're applying the most effective methods. This balance of art and science is what separates good coaches from great ones.</p>
        
        <p>Finally, he emphasizes that coaching isn't just about physical development—it's about building character. Teaching athletes resilience, discipline, and teamwork creates well-rounded individuals who succeed both on and off the field.</p>
      `
    },
    4: {
      title: 'Mental Toughness in Sports',
      meta: 'April 22, 2026 • Training',
      content: `
        <p>Physical training is important, but mental toughness is what separates good athletes from elite performers. When competitions come down to the wire, it's often mental strength that determines the winner. This article explores proven mental strategies that elite athletes use to overcome obstacles and stay focused when it matters most.</p>
        
        <p><strong>Visualization:</strong> Top performers spend time mentally rehearsing their performance. By vividly imagining successful execution of their sport, athletes prime their nervous system and build confidence. This technique is used by Olympic athletes across all sports.</p>
        
        <p><strong>Positive self-talk:</strong> The conversation you have with yourself during competition is critical. Replacing negative thoughts with constructive ones maintains focus and confidence. Practice redirecting doubt into determination.</p>
        
        <p><strong>Goal setting and process focus:</strong> Instead of being overwhelmed by outcome goals, elite athletes focus on process—the small, controllable actions that lead to success. This shifts your mindset from fear of failure to execution of your plan.</p>
        
        <p><strong>Stress management:</strong> High-pressure situations trigger stress responses. Techniques like deep breathing, progressive muscle relaxation, and mindfulness help athletes stay calm and clear-headed when adrenaline is high.</p>
        
        <p>Mental toughness isn't something you're born with—it's a skill you develop through deliberate practice and mental training. By incorporating these strategies into your routine, you'll unlock your full potential.</p>
      `
    },
    5: {
      title: 'Injury Prevention: A Comprehensive Guide',
      meta: 'April 10, 2026 • Health',
      content: `
        <p>Injuries are one of the biggest setbacks an athlete can face. While some injuries are unavoidable, many can be prevented through smart training practices, proper technique, and strategic recovery. This comprehensive guide covers the most effective injury prevention strategies used by elite athletes and sports medicine professionals.</p>
        
        <p><strong>Proper warm-up protocol:</strong> A dynamic warm-up increases core temperature, prepares your nervous system, and activates stabilizer muscles. Spend 10-15 minutes on mobility drills, light cardio, and sport-specific movements before training.</p>
        
        <p><strong>Mobility and flexibility work:</strong> Tight muscles and poor mobility are major injury risk factors. Incorporate 15-20 minutes of dedicated mobility work 3-4 times per week. Focus on areas with high injury rates: shoulders, hips, and ankles.</p>
        
        <p><strong>Progressive overload with proper form:</strong> Gradually increase training volume rather than jumping into high intensity. Poor form under fatigue is a recipe for injury. Always prioritize technique over ego when increasing loads.</p>
        
        <p><strong>Recovery and rest days:</strong> Your body adapts during recovery, not during training. Don't train hard every single day. Include 1-2 complete rest days per week and use active recovery techniques like light jogging or swimming on off days.</p>
        
        <p><strong>Listen to your body:</strong> The difference between pain and a warning sign is subtle. Sharp or persistent pain should never be ignored. Address minor discomfort early before it becomes a serious injury.</p>
      `
    },
    6: {
      title: 'Sleep and Athletic Performance',
      meta: 'March 28, 2026 • Recovery',
      content: `
        <p>Sleep is often overlooked in athletic training, yet it's one of the most powerful performance enhancers available. During sleep, your body repairs muscle tissue, consolidates memories, and releases growth hormone. Elite athletes treat sleep as a critical component of their training program, not an afterthought.</p>
        
        <p><strong>How much sleep do you need?</strong> Most athletes perform best with 7-9 hours of sleep per night. Some high-performing athletes report needing 9-10 hours during intense training phases. Pay attention to how you feel and adjust accordingly.</p>
        
        <p><strong>Sleep timing and consistency:</strong> Going to bed at the same time each night helps regulate your circadian rhythm. Your body performs better when sleep is predictable. Avoid cramming sleep into an irregular schedule when possible.</p>
        
        <p><strong>Pre-sleep routine:</strong> Create a wind-down routine 30-60 minutes before bed. Dim lights, avoid screens, and engage in relaxing activities. This signals to your body that it's time to sleep and improves sleep quality.</p>
        
        <p><strong>Optimize your sleep environment:</strong> Keep your bedroom cool (around 65-68°F), dark, and quiet. A comfortable mattress and pillows make a huge difference. Consider white noise if external sounds disturb you.</p>
        
        <p><strong>Napping strategically:</strong> 20-30 minute naps can boost alertness and performance without causing grogginess. However, naps longer than 90 minutes can leave you feeling groggy. Use napping strategically before important competitions or after poor nighttime sleep.</p>
      `
    },
    7: {
      title: 'Strength Training for Endurance Athletes',
      meta: 'March 15, 2026 • Training',
      content: `
        <p>Many endurance athletes focus exclusively on running, cycling, or swimming, neglecting strength training. This is a missed opportunity. Strategic strength training significantly improves endurance performance, prevents injuries, and increases power output—making you faster and more resilient.</p>
        
        <p><strong>Why strength matters for endurance:</strong> Stronger muscles are more efficient and resistant to fatigue. Improved muscular power means you can maintain higher speeds with less effort. Additionally, stronger stabilizer muscles protect joints under the repetitive stress of endurance training.</p>
        
        <p><strong>Periodizing strength into endurance training:</strong> Don't add strength training haphazardly. During base-building phases, incorporate 2-3 strength sessions per week focusing on compound movements. As you approach competition, reduce strength volume and emphasize maintenance.</p>
        
        <p><strong>Essential exercises for endurance athletes:</strong> Prioritize compound movements: squats, deadlifts, lunges, and upper-body pressing. These movements build functional strength that translates directly to your sport. Avoid overly isolating exercises that don't transfer to endurance performance.</p>
        
        <p><strong>Recovery considerations:</strong> Combining hard endurance training with hard strength training can lead to overtraining. Use recovery strategically—don't do intense strength and intense cardio on the same day. Separate them by at least 6-8 hours or dedicate specific days to each modality.</p>
        
        <p><strong>Case studies from elite athletes:</strong> Many world-class marathoners, cyclists, and triathletes incorporate 2-3 structured strength sessions weekly. These athletes report improved performance, fewer injuries, and better resilience in competitive situations.</p>
      `
    }
  };

  // Modal Elements
  const blogModal = document.getElementById('blogModal');
  const closeModal = document.getElementById('closeModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalBody = document.getElementById('modalBody');

  // Open Modal
  function openBlogModal(blogId) {
    const blog = blogData[blogId];
    if (blog) {
      modalBody.innerHTML = `
        <h2>${blog.title}</h2>
        <p class="post-meta">${blog.meta}</p>
        ${blog.content}
      `;
      blogModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  // Close Modal
  function closeBlogModal() {
    blogModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  // Event Listeners for Read More Links
  const readMoreLinks = document.querySelectorAll('.read-more');
  readMoreLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const blogId = this.getAttribute('data-blog-id');
      openBlogModal(blogId);
    });
  });

  // Close Modal Click Handlers
  if (closeModal) {
    closeModal.addEventListener('click', closeBlogModal);
  }
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeBlogModal);
  }

  // Close modal on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && blogModal.classList.contains('active')) {
      closeBlogModal();
    }
  });
});
