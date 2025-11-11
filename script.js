// Handles login / register and simple client-side "session" using localStorage

(function () {
  function toggleForm() {
    const login = document.getElementById('loginForm');
    const reg = document.getElementById('registerForm');
    if (!login || !reg) return;
    const isLoginVisible = !login.classList.contains('hidden');
    if (isLoginVisible) {
      login.classList.add('hidden');
      reg.classList.remove('hidden');
    } else {
      reg.classList.add('hidden');
      login.classList.remove('hidden');
    }
  }

  function login() {
    const email = document.getElementById('loginEmail')?.value?.trim();
    const pwd = document.getElementById('loginPassword')?.value;
    if (!email) { alert('Please enter email'); return; }
    // demo only: accept any credentials
    const name = email.split('@')[0] || email;
    const user = { name: name.replace(/[^\w\s.-]/g, ''), email };
    localStorage.setItem('ngoUser', JSON.stringify(user));
    // redirect to home
    window.location.href = 'home.html';
  }

  function register() {
    const name = document.getElementById('registerName')?.value?.trim();
    const email = document.getElementById('registerEmail')?.value?.trim();
    const pwd = document.getElementById('registerPassword')?.value;
    if (!name || !email) { alert('Please enter name and email'); return; }
    const user = { name: name.replace(/[^\w\s.-]/g, ''), email };
    localStorage.setItem('ngoUser', JSON.stringify(user));
    window.location.href = 'home.html';
  }

  // expose functions globally for inline onclicks
  window.toggleForm = toggleForm;
  window.login = login;
  window.register = register;

  // if already logged in, go straight to home
  document.addEventListener('DOMContentLoaded', () => {
    const user = localStorage.getItem('ngoUser');
    if (user) {
      try { window.location.href = 'home.html'; } catch (e) {}
    }
  });
})();
