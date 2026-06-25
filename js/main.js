import { initAuthModal } from './auth-modal.js';
import { initBmiCalculator } from './bmi.js';
import { initBlogModal } from './blog.js';
import { initNutritionPlans } from './nutrition.js';
import { initEventRegistration } from './events.js';

document.addEventListener('DOMContentLoaded', function () {
  initAuthModal();
  initBmiCalculator();
  initBlogModal();
  initNutritionPlans();
  initEventRegistration();
});
