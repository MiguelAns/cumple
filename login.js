document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
  
    // Credenciales del administrador (puedes reemplazarlas con datos encriptados o un backend)
    const ADMIN_CREDENTIALS = {
      username: 'admin',
      password: 'admin123', // Contraseña segura en producción
    };
  
    // Manejar el envío del formulario de inicio de sesión
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();
  
      // Validar credenciales
      if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Guardar sesión en localStorage
        localStorage.setItem('isAuthenticated', 'true');
        // Redirigir a la página principal
        window.location.href = 'index.html';
      } else {
        // Mostrar mensaje de error
        errorMessage.textContent = 'Usuario o contraseña incorrectos.';
      }
    });
  });
// Manejar el cierre de sesión
document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
      logoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        // Eliminar la sesión
        localStorage.removeItem('isAuthenticated');
        // Redirigir al inicio de sesión
        window.location.href = 'login.html';
      });
    }
  });
    