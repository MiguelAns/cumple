document.addEventListener('DOMContentLoaded', () => {
    const guardForm = document.getElementById('guard-form');
    const guardNameInput = document.getElementById('guard-name');
    const guardDateInput = document.getElementById('guard-date');
    const guardTableBody = document.querySelector('#guard-table tbody');
  
    // Obtener guardias de localStorage o inicializar un array vacío
    let guards = JSON.parse(localStorage.getItem('guards')) || [];
  
    // Guardar en localStorage
    function saveToLocalStorage() {
      localStorage.setItem('guards', JSON.stringify(guards));
    }
  
    // Renderizar la tabla
    function renderTable() {
      guardTableBody.innerHTML = ''; // Limpia la tabla
      guards.forEach((guard, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${guard.name}</td>
          <td>${new Date(guard.date).toLocaleDateString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}</td>
          <td><button class="delete-button" data-index="${index}">❌ Eliminar</button></td>
        `;
        guardTableBody.appendChild(row);
      });
    }
  
    // Manejar el envío del formulario
    guardForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const name = guardNameInput.value.trim();
      const date = guardDateInput.value;
  
      if (name && date) {
        // Agregar un nuevo guardia
        guards.push({ name, date });
        saveToLocalStorage();
        renderTable();
  
        // Limpiar el formulario
        guardNameInput.value = '';
        guardDateInput.value = '';
      }
    });
  
    // Manejar la eliminación de guardias
    guardTableBody.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-button')) {
        const index = e.target.getAttribute('data-index');
        guards.splice(index, 1); // Eliminar el guardia del array
        saveToLocalStorage();
        renderTable(); // Renderizar de nuevo la tabla
      }
    });
  
    // Renderizar la tabla inicial al cargar la página
    renderTable();
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const toggleMenuButton = document.getElementById('toggle-menu');
  
    // Alternar la clase "hidden" para mostrar/ocultar la barra
    toggleMenuButton.addEventListener('click', () => {
      sidebar.classList.toggle('hidden');
    });
  });