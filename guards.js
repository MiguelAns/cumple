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

  function renderTable() {
    guardTableBody.innerHTML = ''; // Limpia la tabla
    guards.forEach((guard, index) => {
      // Aquí simplemente usamos la fecha como está, sin convertirla a UTC
      const row = document.createElement('tr');
      const guardDate = new Date(`${guard.date}T00:00:00`); // Asume hora local (evita desfase)
      row.innerHTML = `
        <td>${guard.name}</td>
        <td>${guardDate.toLocaleDateString('es-ES', {
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
  
  // Formateo al guardar fechas
  function formatDateLocal(date) {
    return date.toISOString().split('T')[0]; // "YYYY-MM-DD", sin ajustes
  }
  
  // En el manejo del formulario
  guardForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const name = guardNameInput.value.trim();
    const date = new Date(guardDateInput.value); // Crear objeto Date
  
    if (name && date) {
      // Guardar la fecha directamente como string en formato "YYYY-MM-DD"
      const formattedDate = formatDateLocal(date);
  
      // Agregar un nuevo guardia
      guards.push({ name, date: formattedDate });
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
