document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('birthday-form');
  const nameInput = document.getElementById('name');
  const dateInput = document.getElementById('date');
  const viewCalendarBtn = document.getElementById('view-calendar');

  // Cargar cumpleaños desde localStorage
  let birthdays = JSON.parse(localStorage.getItem('birthdays')) || [];

  // Guardar cumpleaños en localStorage
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que la página se recargue
    const name = nameInput.value;
    const date = dateInput.value;

    if (name && date) {
      birthdays.push({ name, date }); // Agregar a la lista
      localStorage.setItem('birthdays', JSON.stringify(birthdays)); // Guardar en localStorage
      nameInput.value = '';
      dateInput.value = '';
      alert('¡Cumpleaños añadido exitosamente!');
    } else {
      alert('Por favor, completa todos los campos.');
    }
  });

  // Redirigir al calendario
  viewCalendarBtn.addEventListener('click', () => {
    window.location.href = 'calendar.html';
  });
});
