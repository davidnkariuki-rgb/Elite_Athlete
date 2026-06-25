function initNutritionPlans() {
  const planActions = document.querySelectorAll('.plan-action');
  const detailBlocks = document.querySelectorAll('.detail-block');

  if (!planActions.length || !detailBlocks.length) {
    return;
  }

  function showPlanDetail(planId) {
    detailBlocks.forEach(function (block) {
      block.classList.toggle('active', block.id === planId);
    });

    const target = document.getElementById(planId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  planActions.forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      const planId = this.getAttribute('data-plan');
      if (planId) {
        showPlanDetail(planId);
      }
    });
  });

  detailBlocks.forEach(function (block, index) {
    block.classList.toggle('active', index === 0);
  });
}

document.addEventListener('DOMContentLoaded', initNutritionPlans);