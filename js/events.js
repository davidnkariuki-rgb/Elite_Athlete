function initEventRegistration() {
  const eventModal = document.getElementById('eventModal');
  const closeEventModal = document.getElementById('closeEventModal');
  const eventBackdrop = document.getElementById('eventBackdrop');
  const eventTitle = document.getElementById('eventTitle');
  const eventForm = document.getElementById('eventForm');
  const registerButtons = document.querySelectorAll('.register-btn');

  if (!eventModal || !eventTitle || !eventForm || !registerButtons.length) {
    return;
  }

  function openEventModal(eventName) {
    eventTitle.textContent = eventName;
    eventForm.reset();
    eventModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeEventRegistration() {
    eventModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  registerButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      openEventModal(this.getAttribute('data-event'));
    });
  });

  if (closeEventModal) {
    closeEventModal.addEventListener('click', closeEventRegistration);
  }

  if (eventBackdrop) {
    eventBackdrop.addEventListener('click', closeEventRegistration);
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && eventModal.classList.contains('active')) {
      closeEventRegistration();
    }
  });

  eventForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = {
      event: eventTitle.textContent,
      fullName: document.getElementById('fullName').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      experience: document.getElementById('experience').value,
      sport: document.getElementById('sport').value,
      goals: document.getElementById('goals').value,
      newsletter: document.getElementById('newsletter').checked
    };

    console.log('Event Registration Submitted:', formData);
    alert(`Thank you for registering for "${formData.event}"!\n\nA confirmation email has been sent to ${formData.email}`);
    closeEventRegistration();
  });
}

document.addEventListener('DOMContentLoaded', initEventRegistration);