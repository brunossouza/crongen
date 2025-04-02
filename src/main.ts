import './style.css';

type Frequency = 'once' | 'daily' | 'weekly' | 'monthly';

document.addEventListener('DOMContentLoaded', () => {
  // Get DOM elements
  const form = document.getElementById('cronForm') as HTMLFormElement;
  const frequencySelect = document.getElementById('frequencySelect') as HTMLSelectElement;
  const dateInput = document.getElementById('dateInput') as HTMLInputElement;
  const timeInput = document.getElementById('timeInput') as HTMLInputElement;
  const cronResult = document.getElementById('cronResult') as HTMLDivElement;
  const cronExplanation = document.getElementById('cronExplanation') as HTMLDivElement;

  // Set default value to current date/time
  const now = new Date();
  dateInput.value = formatDate(now);
  timeInput.value = formatTime(now);

  // Configure date input mask (DD/MM/YYYY)
  dateInput.addEventListener('input', function (e) {
    const target = e.target as HTMLInputElement;
    let value = target.value.replace(/\D/g, '');

    if (value.length > 0) {
      value = value.substring(0, 8);
      let formattedValue = '';

      for (let i = 0; i < value.length; i++) {
        if (i === 2 || i === 4) {
          formattedValue += '/';
        }
        formattedValue += value[i];
      }

      target.value = formattedValue;
    }
  });

  // Configure time input mask (HH:MM)
  timeInput.addEventListener('input', function (e) {
    const target = e.target as HTMLInputElement;
    let value = target.value.replace(/\D/g, '');

    if (value.length > 0) {
      value = value.substring(0, 4);
      let formattedValue = '';

      for (let i = 0; i < value.length; i++) {
        if (i === 2) {
          formattedValue += ':';
        }
        formattedValue += value[i];
      }

      target.value = formattedValue;
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get the selected frequency and parse datetime
    const frequency = frequencySelect.value as Frequency;

    try {
      // Parse date from Brazilian format (DD/MM/YYYY)
      const dateTimeObj = parseBrazilianDateTime(dateInput.value, timeInput.value);

      // Extract date components
      const minutes = dateTimeObj.getMinutes();
      const hours = dateTimeObj.getHours();
      const dayOfMonth = dateTimeObj.getDate();
      const month = dateTimeObj.getMonth() + 1; // JavaScript months are 0-indexed
      const dayOfWeek = dateTimeObj.getDay(); // 0 (Sunday) to 6 (Saturday)

      // Generate cron expression based on the selected frequency
      let cronExpression = '';

      switch (frequency) {
        case 'once':
          cronExpression = `${minutes} ${hours} ${dayOfMonth} ${month} ${dayOfWeek}`;
          break;
        case 'daily':
          cronExpression = `${minutes} ${hours} * * *`;
          break;
        case 'weekly':
          cronExpression = `${minutes} ${hours} * * ${dayOfWeek}`;
          break;
        case 'monthly':
          cronExpression = `${minutes} ${hours} ${dayOfMonth} * *`;
          break;
      }

      // Display the result
      cronResult.textContent = cronExpression;

      // Generate explanation
      const explanation = generateExplanation(frequency, minutes, hours, dayOfMonth, month, dayOfWeek);
      cronExplanation.innerHTML = explanation;
    } catch (error) {
      alert('Por favor, insira uma data e hora válidas no formato DD/MM/AAAA HH:MM.');
    }
  });

  // Update UI when frequency changes
  frequencySelect.addEventListener('change', () => {
    form.dispatchEvent(new Event('submit'));
  });

  // Initial generation
  form.dispatchEvent(new Event('submit'));
});

// Helper function to format date as DD/MM/YYYY
function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// Helper function to format time as HH:MM
function formatTime(date: Date): string {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

// Helper function to parse date and time from Brazilian format
function parseBrazilianDateTime(dateStr: string, timeStr: string): Date {
  // Expected formats: DD/MM/YYYY and HH:MM
  const dateParts = dateStr.split('/');
  const timeParts = timeStr.split(':');

  if (dateParts.length !== 3 || timeParts.length !== 2) {
    throw new Error('Invalid date or time format');
  }

  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; // 0-indexed months
  const year = parseInt(dateParts[2], 10);
  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);

  const dateObj = new Date(year, month, day, hours, minutes);

  if (isNaN(dateObj.getTime())) {
    throw new Error('Invalid date or time');
  }

  return dateObj;
}

function generateExplanation(
  frequency: Frequency,
  minutes: number,
  hours: number,
  dayOfMonth: number,
  month: number,
  dayOfWeek: number
): string {
  const weekdays = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
  const months = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
  ];

  const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  const dateStr = `${dayOfMonth.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}`;

  switch (frequency) {
    case 'once':
      return `<p>Esta expressão cron é executada uma única vez às <strong>${timeStr}</strong> 
        no dia <strong>${dateStr}</strong> (${dayOfMonth} de ${months[month - 1]}), 
        em uma <strong>${weekdays[dayOfWeek]}</strong>.</p>
        <p>Formato: <code>minutos horas dia-do-mês mês dia-da-semana</code></p>`;

    case 'daily':
      return `<p>Esta expressão cron é executada <strong>todos os dias às ${timeStr}</strong>.</p>
        <p>Formato: <code>minutos horas * * *</code> (onde * significa "todos")</p>`;

    case 'weekly':
      return `<p>Esta expressão cron é executada <strong>toda ${weekdays[dayOfWeek]} às ${timeStr}</strong>.</p>
        <p>Formato: <code>minutos horas * * dia-da-semana</code></p>`;

    case 'monthly':
      return `<p>Esta expressão cron é executada <strong>todo dia ${dayOfMonth} de cada mês às ${timeStr}</strong>.</p>
        <p>Formato: <code>minutos horas dia-do-mês * *</code></p>`;

    default:
      return '';
  }
}
