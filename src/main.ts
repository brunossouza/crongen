import './style.css';

type Frequency = 'once' | 'daily' | 'weekly' | 'monthly';

document.addEventListener('DOMContentLoaded', () => {
  // Get DOM elements
  const form = document.getElementById('cronForm') as HTMLFormElement;
  const frequencySelect = document.getElementById('frequencySelect') as HTMLSelectElement;
  const dateTimeInput = document.getElementById('dateTimeInput') as HTMLInputElement;
  const cronResult = document.getElementById('cronResult') as HTMLDivElement;
  const cronExplanation = document.getElementById('cronExplanation') as HTMLDivElement;

  // Set default value to current date/time
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  dateTimeInput.value = now.toISOString().slice(0, 16);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get the selected frequency and datetime
    const frequency = frequencySelect.value as Frequency;
    const dateTimeString = dateTimeInput.value;

    if (!dateTimeString) {
      alert('Por favor, insira uma data e hora válidas.');
      return;
    }

    const dateTime = new Date(dateTimeString);

    // Extract date components
    const minutes = dateTime.getMinutes();
    const hours = dateTime.getHours();
    const dayOfMonth = dateTime.getDate();
    const month = dateTime.getMonth() + 1; // JavaScript months are 0-indexed
    const dayOfWeek = dateTime.getDay(); // 0 (Sunday) to 6 (Saturday)

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
  });

  // Update UI when frequency changes
  frequencySelect.addEventListener('change', () => {
    form.dispatchEvent(new Event('submit'));
  });

  // Initial generation
  form.dispatchEvent(new Event('submit'));
});

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

  const timeStr = `${hours}:${minutes.toString().padStart(2, '0')}`;

  switch (frequency) {
    case 'once':
      return `<p>Esta expressão cron é executada uma única vez às <strong>${timeStr}</strong> 
        no dia <strong>${dayOfMonth}</strong> de <strong>${months[month - 1]}</strong>, 
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
