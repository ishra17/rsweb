// Mobile menu
const toggle = document.getElementById('menuToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

// Form submission via Formspree (AJAX so user stays on page)
const form = document.getElementById('enquiryForm');
const msg = document.getElementById('formMsg');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type=submit]');
  const original = btn.textContent;
  btn.textContent = 'Sending…';
  btn.disabled = true;
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      msg.className = 'form-msg success';
      msg.textContent = '✓ Thank you! Your enquiry has been sent. We\'ll be in touch shortly.';
      form.reset();
    } else {
      throw new Error('Submission failed');
    }
  } catch (err) {
    msg.className = 'form-msg error';
    msg.innerHTML = 'Something went wrong. Please email us directly at <a href="mailto:enquiry@rsenterprises.in">enquiry@rsenterprises.in</a>.';
  } finally {
    btn.textContent = original;
    btn.disabled = false;
    msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
});
