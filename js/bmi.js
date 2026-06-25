function initBmiCalculator() {
  const bmiForm = document.getElementById('bmi-form');
  const bmiResult = document.getElementById('bmi-result');

  if (!bmiForm || !bmiResult) {
    return;
  }

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

document.addEventListener('DOMContentLoaded', initBmiCalculator);