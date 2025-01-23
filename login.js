document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Enviar cookies con la solicitud
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message); // Muestra el mensaje de error del backend
        return;
      }

      const data = await response.json();

      // Redirige según el rol
      if (data.role === 'admin') {
        window.location.href = 'index.html';
      } else if (data.role === 'user') {
        window.location.href = 'user.html';
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  });
});
