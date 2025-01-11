document.addEventListener('DOMContentLoaded', () => {
    const uniformForm = document.getElementById('uniform-form');
    const uniformNameInput = document.getElementById('uniform-name');
    const uniformDateInput = document.getElementById('uniform-date');
    const uniformTableBody = document.querySelector('#uniform-table tbody');
  
    // Obtener uniformes de localStorage o inicializar un array vacío
    let uniforms = JSON.parse(localStorage.getItem('uniforms')) || [];
  
    // Guardar en localStorage
    function saveToLocalStorage() {
      localStorage.setItem('uniforms', JSON.stringify(uniforms));
    }
  
    // Renderizar la tabla
    function renderTable() {
      uniformTableBody.innerHTML = ''; // Limpia la tabla
      uniforms.forEach((uniform, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${uniform.name}</td>
          <td>${new Date(uniform.date).toLocaleDateString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}</td>
          <td><button class="delete-button" data-index="${index}">❌ Eliminar</button></td>
        `;
        uniformTableBody.appendChild(row);
      });
    }
  
    // Manejar el envío del formulario
    uniformForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const name = uniformNameInput.value.trim();
      const date = uniformDateInput.value;
  
      if (name && date) {
        // Agregar un nuevo uniforme
        uniforms.push({ name, date });
        saveToLocalStorage();
        renderTable();
  
        // Limpiar el formulario
        uniformNameInput.value = '';
        uniformDateInput.value = '';
      }
    });
  
    // Manejar la eliminación de uniformes
    uniformTableBody.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-button')) {
        const index = e.target.getAttribute('data-index');
        uniforms.splice(index, 1); // Eliminar el uniforme del array
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
  