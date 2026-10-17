/* ============================================================
   SUNRISE AFH — Form Handling with Formspree
   Real-time validation + submission feedback
   ============================================================ */

'use strict';

// ─── Configuration ─────────────────────────────────────────────
// Replace YOUR_FORM_ID with your actual Formspree form ID
// Sign up at https://formspree.io, create a form, and paste the ID here
const FORMSPREE_TOUR_ID = 'xdavelrd';  // e.g. 'xpwzgkqd'
const FORMSPREE_CONTACT_ID = 'xdavelrd';  // e.g. 'xpwzgkqd' (can be same form)

// ─── Validation Rules ──────────────────────────────────────────
const validators = {
  required: (val) => val.trim() !== '' || 'This field is required.',
  email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()) || 'Please enter a valid email address.',
  phone: (val) => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(val.replace(/\s/g, '')) || 'Please enter a valid phone number.',
  minLength: (n) => (val) => val.trim().length >= n || `Must be at least ${n} characters.`,
};

// ─── Validate Single Field ─────────────────────────────────────
function validateField(input) {
  const group = input.closest('.form-group');
  if (!group) return true;
  const errorEl = group.querySelector('.form-error');
  const rules = input.dataset.validate ? input.dataset.validate.split(' ') : [];

  let error = null;

  for (const rule of rules) {
    let result;
    if (rule === 'required') {
      result = validators.required(input.value);
    } else if (rule === 'email') {
      result = validators.email(input.value);
    } else if (rule === 'phone') {
      result = validators.phone(input.value);
    } else if (rule.startsWith('min:')) {
      const n = parseInt(rule.split(':')[1], 10);
      result = validators.minLength(n)(input.value);
    }

    // Only validate non-required rules if field has value
    if (rule !== 'required' && input.value.trim() === '') continue;
    if (result !== true) { error = result; break; }
  }

  if (error) {
    group.classList.add('has-error');
    if (errorEl) errorEl.textContent = error;
    input.setAttribute('aria-invalid', 'true');
    return false;
  } else {
    group.classList.remove('has-error');
    if (errorEl) errorEl.textContent = '';
    input.setAttribute('aria-invalid', 'false');
    return true;
  }
}

// ─── Setup Real-time Validation ────────────────────────────────
function setupRealTimeValidation(form) {
  form.querySelectorAll('input, textarea, select').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.closest('.form-group').classList.contains('has-error')) {
        validateField(input);
      }
    });
  });
}

// ─── Submit to Formspree ───────────────────────────────────────
async function submitToFormspree(formspreeId, data) {
  const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const json = await response.json().catch(() => ({}));
    throw new Error(json.error || `Server error: ${response.status}`);
  }
  return response.json();
}

// ─── Show Success State ────────────────────────────────────────
function showSuccess(formEl, successEl) {
  formEl.style.display = 'none';
  successEl.style.display = 'block';
  successEl.classList.add('show');
  successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ─── Show Submit Error ─────────────────────────────────────────
function showSubmitError(btn, originalText, message) {
  btn.textContent = 'Error — Try Again';
  btn.style.background = '#E53E3E';
  btn.disabled = false;

  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
    btn.disabled = false;
  }, 4000);

  console.error('Form submission error:', message);
}

// ─── Generic Form Handler ──────────────────────────────────────
function setupForm(formId, formspreeId, successId) {
  const form = document.getElementById(formId);
  if (!form) return;

  const successEl = document.getElementById(successId);
  const submitBtn = form.querySelector('[type="submit"]');

  setupRealTimeValidation(form);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    const inputs = form.querySelectorAll('input, textarea, select');
    let allValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) allValid = false;
    });

    if (!allValid) {
      const firstError = form.querySelector('.has-error input, .has-error textarea');
      if (firstError) firstError.focus();
      return;
    }

    // Build data object
    const data = {};
    inputs.forEach(input => {
      if (input.name) data[input.name] = input.value;
    });

    // Disable button + loading state
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = '⏳ Sending…';

    try {
      await submitToFormspree(formspreeId, data);
      if (successEl) showSuccess(form, successEl);
    } catch (err) {
      showSubmitError(submitBtn, originalText, err.message);
    }
  });
}

// ─── Initialize Forms ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setupForm('tourForm', FORMSPREE_TOUR_ID, 'tourSuccess');
  setupForm('contactForm', FORMSPREE_CONTACT_ID, 'contactSuccess');
});
