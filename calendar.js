document.addEventListener('DOMContentLoaded', () => {
  const calendar = document.getElementById('calendar');
  let birthdays = JSON.parse(localStorage.getItem('birthdays')) || [];

  // Mostrar notificación tipo toast
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;

    // Estilo básico para el toast
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.backgroundColor = '#4CAF50';
    toast.style.color = '#fff';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '5px';
    toast.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    toast.style.zIndex = '1000';
    toast.style.animation = 'fade-in-out 3s ease';

    document.body.appendChild(toast);

    // Eliminar el toast después de 3 segundos
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  // Verificar cumpleaños del día
  function checkTodayBirthdays() {
    const today = new Date().toISOString().slice(0, 10); // Formato YYYY-MM-DD
    let found = false;

    birthdays.forEach((birthday) => {
      if (birthday.date === today) {
        showToast(`🎉 Hoy es el cumpleaños de ${birthday.name} 🎂`);
        found = true;
      }
    });

    if (!found) {
      showToast("📅 No hay cumpleaños hoy.");
    }
  }

  // Generar el calendario
  function generateCalendar() {
    calendar.innerHTML = ''; // Limpia el calendario antes de generarlo
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Crear los días vacíos al inicio
    for (let i = 0; i < firstDay; i++) {
      const emptyDay = document.createElement('div');
      emptyDay.className = 'day empty';
      calendar.appendChild(emptyDay);
    }

    // Crear los días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day).toISOString().slice(0, 10);
      const dayDiv = document.createElement('div');
      dayDiv.className = 'day';
      dayDiv.innerHTML = `<span class="date">${day}</span>`;

      // Verificar si hay cumpleaños en este día
      const birthdaysOnThisDay = birthdays.filter((birthday) => birthday.date === date);
      if (birthdaysOnThisDay.length > 0) {
        const birthdayList = document.createElement('ul');
        birthdayList.className = 'birthday-list';

        birthdaysOnThisDay.forEach((birthday, index) => {
          const birthdayItem = document.createElement('li');
          birthdayItem.innerText = `${birthday.name}`;

          // Botón de eliminar
          const deleteButton = document.createElement('button');
          deleteButton.innerText = '❌';
          deleteButton.onclick = () => {
            birthdays = birthdays.filter((b, i) => !(b.date === date && i === index));
            localStorage.setItem('birthdays', JSON.stringify(birthdays));
            generateCalendar(); // Actualizar el calendario
            showToast(`🗑️ Cumpleaños de ${birthday.name} eliminado.`);
          };

          birthdayItem.appendChild(deleteButton);
          birthdayList.appendChild(birthdayItem);
        });

        dayDiv.appendChild(birthdayList);
      }

      calendar.appendChild(dayDiv);
    }
  }

  // Ejecutar funciones
  if (calendar) {
    generateCalendar(); // Generar el calendario
    checkTodayBirthdays(); // Mostrar toasts si hay cumpleaños hoy
  } else {
    console.error('Elemento #calendar no encontrado.');
  }
});


