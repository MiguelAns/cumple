document.addEventListener('DOMContentLoaded', () => {
  const calendarContainer = document.getElementById('calendar');
  const prevButton = document.getElementById('prev-month');
  const nextButton = document.getElementById('next-month');
  const monthLabel = document.getElementById('month-label');
  // Inicializa el canvas y su contexto
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  let birthdays = JSON.parse(localStorage.getItem('birthdays')) || [];

  // Ajustar el tamaño del canvas
  function resizeCanvas() {
    canvas.width = calendarContainer.offsetWidth;
    canvas.height = calendarContainer.offsetHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Mostrar notificación tipo toast
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;

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

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
// Ajusta el tamaño del canvas al tamaño de la ventana
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
  // Generar fuegos artificiales
function showFireworks() {
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#A633FF'];
  const particles = [];

  // Genera partículas para los fuegos artificiales
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: canvas.width / 2, // Centro de la pantalla
      y: canvas.height / 2,
      angle: Math.random() * 2 * Math.PI, // Ángulo aleatorio
      speed: Math.random() * 4 + 2, // Velocidad aleatoria
      radius: Math.random() * 3 + 2, // Tamaño aleatorio
      color: colors[Math.floor(Math.random() * colors.length)], // Color aleatorio
      life: Math.random() * 100 + 50, // Tiempo de vida aleatorio
    });
  }

    // Dibuja las partículas
  function drawFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
      const dx = Math.cos(particle.angle) * particle.speed;
      const dy = Math.sin(particle.angle) * particle.speed;

      particle.x += dx;
      particle.y += dy;
      particle.life -= 1;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();

        // Elimina partículas cuya vida se haya agotado
      if (particle.life <= 0) {
        particles.splice(index, 1);
      }
    });

    // Si aún quedan partículas, continúa animando
    if (particles.length > 0) {
      requestAnimationFrame(drawFireworks);
    }
  }

  drawFireworks();
}

  // Verificar cumpleaños del día
  function checkTodayBirthdays() {
    const today = new Date().toISOString().slice(0, 10);
    let found = false;

    birthdays.forEach((birthday) => {
      if (birthday.date === today) {
        showToast(`🎉 Hoy es el cumpleaños de ${birthday.name} 🎂`);
        if (!found) {
          showFireworks();
        }
        found = true;
      }
    });

    if (!found) {
      console.log('No hay cumpleaños hoy.');
    }
  }

  // Generar un mes completo
  function generateMonth(monthIndex, year) {
    calendarContainer.innerHTML = '';
    monthLabel.innerText = `${months[monthIndex]} ${year}`;

    const weekdaysRow = document.createElement('div');
    weekdaysRow.className = 'weekdays';
    weekdays.forEach((day) => {
      const dayDiv = document.createElement('div');
      dayDiv.className = 'weekday';
      dayDiv.innerText = day;
      weekdaysRow.appendChild(dayDiv);
    });
    calendarContainer.appendChild(weekdaysRow);

    const daysRow = document.createElement('div');
    daysRow.className = 'days';
    const firstDay = new Date(year, monthIndex, 1).getDay();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      const emptyDay = document.createElement('div');
      emptyDay.className = 'day empty';
      daysRow.appendChild(emptyDay);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, monthIndex, day).toISOString().slice(0, 10);
      const dayDiv = document.createElement('div');
      dayDiv.className = 'day';
      dayDiv.innerHTML = `<span class="date">${day}</span>`;

      const birthdaysOnThisDay = birthdays.filter((birthday) => birthday.date === date);
      if (birthdaysOnThisDay.length > 0) {
        const birthdayList = document.createElement('ul');
        birthdayList.className = 'birthday-list';

        birthdaysOnThisDay.forEach((birthday, index) => {
          const birthdayItem = document.createElement('li');
          birthdayItem.innerText = birthday.name;

          const deleteButton = document.createElement('button');
          deleteButton.innerText = '❌';
          deleteButton.onclick = () => {
            birthdays = birthdays.filter((b, i) => !(b.date === date && i === index));
            localStorage.setItem('birthdays', JSON.stringify(birthdays));
            generateMonth(currentMonth, currentYear);
            showToast(`🗑️ Cumpleaños de ${birthday.name} eliminado.`);
          };

          birthdayItem.appendChild(deleteButton);
          birthdayList.appendChild(birthdayItem);
        });

        dayDiv.appendChild(birthdayList);
      }

      daysRow.appendChild(dayDiv);
    }

    calendarContainer.appendChild(daysRow);
  }

  prevButton.addEventListener('click', () => {
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear--;
    } else {
      currentMonth--;
    }
    generateMonth(currentMonth, currentYear);
  });
  
  
  nextButton.addEventListener('click', () => {
    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear++;
    } else {
      currentMonth++;
    }
    generateMonth(currentMonth, currentYear);
  });

  generateMonth(currentMonth, currentYear);
  checkTodayBirthdays();
});
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const toggleMenuButton = document.getElementById('toggle-menu');

  // Alternar la clase "hidden" para mostrar/ocultar la barra
  toggleMenuButton.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
  });
});
