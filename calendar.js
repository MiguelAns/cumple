document.addEventListener("DOMContentLoaded", () => {
  const calendarElement = document.getElementById("calendar");
  const monthLabel = document.getElementById("month-label");
  const prevMonthBtn = document.getElementById("prev-month");
  const nextMonthBtn = document.getElementById("next-month");

  let currentDate = new Date();

  // Ajustar fechas al timezone local
  function formatDateLocal(date) {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString().split("T")[0];
  }

  // Cargar guardias desde localStorage
  function loadGuards() {
    const guardiasJSON = localStorage.getItem("guards");
    return guardiasJSON ? JSON.parse(guardiasJSON) : [];
  }

  // Cargar cumpleaños desde localStorage
  function loadBirthdays() {
    const birthdaysJSON = localStorage.getItem("birthdays");
    return birthdaysJSON ? JSON.parse(birthdaysJSON) : [];
  }

  // Guardar nueva guardia
  function saveGuard(date, name, details) {
    const guardiasJSON = localStorage.getItem("guards");
    const guardias = guardiasJSON ? JSON.parse(guardiasJSON) : [];

    const formattedDate = formatDateLocal(new Date(date)); // Ajuste de fecha
    guardias.push({ date: formattedDate, name, details });
    localStorage.setItem("guards", JSON.stringify(guardias));
  }

  // Mostrar fuegos artificiales
  function launchFireworks() {
    const body = document.body;
    const fireworks = document.createElement("div");
    fireworks.className = "fireworks";
    body.appendChild(fireworks);

    setTimeout(() => {
      fireworks.remove();
    }, 3000); // Duración de 3 segundos
  }

  // Renderizar el calendario
  function renderCalendar() {
    calendarElement.innerHTML = ""; // Limpia el calendario
    const guards = loadGuards();
    const birthdays = loadBirthdays();

    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Título del mes y año
    monthLabel.textContent = firstDay.toLocaleString("default", { month: "long", year: "numeric" });

    // Crear espacio para los días vacíos antes del primer día del mes
    const emptyDays = firstDay.getDay();
    for (let i = 0; i < emptyDays; i++) {
      const emptyCell = document.createElement("div");
      emptyCell.className = "day empty";
      calendarElement.appendChild(emptyCell);
    }

    // Generar los días del calendario
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      const formattedDate = formatDateLocal(date);

      const dayElement = document.createElement("div");
      dayElement.className = "day";
      dayElement.textContent = day;

      // Buscar si hay guardias en esta fecha
      const guard = guards.find((g) => g.date === formattedDate);
      if (guard) {
        const guardInfo = document.createElement("span");
        guardInfo.className = "guard-info";
        guardInfo.textContent = `👮: ${guard.name}`;
        dayElement.appendChild(guardInfo);
      }

      // Buscar si hay cumpleaños en esta fecha
      const birthday = birthdays.find((b) => b.date === formattedDate);
      if (birthday) {
        const birthdayInfo = document.createElement("span");
        birthdayInfo.className = "birthday-info";
        birthdayInfo.textContent = `🎂: ${birthday.name}`;
        dayElement.appendChild(birthdayInfo);

        // Lanzar fuegos artificiales si es el día actual
        if (formattedDate === formatDateLocal(new Date())) {
          launchFireworks();
        }
      }

      calendarElement.appendChild(dayElement);
    }
  }

  // Navegación por meses
  prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });

  nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });

  // Inicializar el calendario
  renderCalendar();
});

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const toggleMenuButton = document.getElementById('toggle-menu');

  // Alternar la clase "hidden" para mostrar/ocultar la barra
  toggleMenuButton.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
  });
});


document.addEventListener('DOMContentLoaded', async () => {
  let userRole = null;

  // Verificar sesión
  try {
    const response = await fetch('http://localhost:3000/session', {
      method: 'GET',
      credentials: 'include',
    });

    if (response.ok) {
      const userData = await response.json();
      userRole = userData.role; // Obtener el rol del usuario
    } else {
      window.location.href = 'login.html'; // Redirige si no está autenticado
    }
  } catch (error) {
    console.error('Error al verificar la sesión:', error);
    window.location.href = 'login.html';
  }

  // Renderizar el calendario
  renderCalendar();

  // Permitir agregar/modificar eventos solo si es administrador
  if (userRole === 'admin') {
    enableEventModification();
  } else {
    console.log('Modo visualización: Solo lectura');
  }
});

// Función para renderizar el calendario (solo lectura para usuarios)
function renderCalendar() {
  const calendarElement = document.getElementById('calendar');
  const guards = JSON.parse(localStorage.getItem('guards')) || [];
  const birthdays = JSON.parse(localStorage.getItem('birthdays')) || [];

  // Lógica para mostrar el calendario (igual a tu implementación actual)
}

// Habilitar acciones de modificación (solo para administradores)
function enableEventModification() {
  console.log('Habilitando acciones de modificación');
  // Aquí agrega lógica para permitir modificar datos si es administrador
}
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const toggleMenuButton = document.getElementById('toggle-menu');

  // Alternar la clase "hidden" para mostrar/ocultar la barra
  toggleMenuButton.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
  });
});