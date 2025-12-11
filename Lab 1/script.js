// Back button: go to home page
const backBtn = document.getElementById('backBtn');
if (backBtn) {
  backBtn.addEventListener('click', function () {
    window.location.href = 'index.html';
  });
}

// Helper: show top banner
function showBanner(message, type) {
  const banner = document.getElementById('topBanner');
  if (!banner) return;

  banner.textContent = message;
  banner.classList.remove('hidden', 'success-banner', 'error-banner');

  if (type === 'success') {
    banner.classList.add('success-banner');
  } else if (type === 'error') {
    banner.classList.add('error-banner');
  }

  // Auto-hide after 3 seconds
  setTimeout(() => {
    banner.classList.add('hidden');
  }, 3000);
}

// Form validation (only runs on registration page)
const form = document.getElementById('regForm');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    // Clear previous messages
    ['nameError', 'regnoError', 'emailError', 'phoneError'].forEach(id => {
      document.getElementById(id).textContent = '';
    });
    document.getElementById('successMsg').textContent = '';

    const name = document.getElementById('name').value.trim();
    const regno = document.getElementById('regno').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    // Name: at least 3 characters
    if (name.length < 3) {
      document.getElementById('nameError').textContent =
        'Name must be at least 3 characters.';
      valid = false;
    }

    // Registration number: 2 digits + 3 letters + 4 digits
    const regnoPattern = /^[0-9]{2}[A-Za-z]{3}[0-9]{4}$/;
    if (!regnoPattern.test(regno)) {
      document.getElementById('regnoError').textContent =
        'Enter a valid registration number (e.g., 22BCE1234).';
      valid = false;
    }

    // Basic email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      document.getElementById('emailError').textContent =
        'Enter a valid email address.';
      valid = false;
    }

    // Phone: Indian 10‑digit number 
    const phonePattern = /^[1-9][0-9]{9}$/;
    if (!phonePattern.test(phone)) {
      document.getElementById('phoneError').textContent =
        'Enter a valid 10-digit mobile number';
      valid = false;
    }

    if (valid) {
      document.getElementById('successMsg').textContent =
        'Registered successfully!';
      showBanner('Registered successfully!', 'success');
      form.reset();
    } else {
      showBanner('Please fix the highlighted errors.', 'error');
    }
  });
}
