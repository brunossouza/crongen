import './style.css';
import { formatDate, formatTime, parseBrazilianDateTime } from './utils/dateUtils';
import { Frequency, generateCronExpression, generateExplanation } from './utils/cronUtils';

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
      const cronExpression = generateCronExpression(
        frequency, minutes, hours, dayOfMonth, month, dayOfWeek
      );

      // Display the result
      cronResult.textContent = cronExpression;

      // Generate explanation
      const explanation = generateExplanation(
        frequency, minutes, hours, dayOfMonth, month, dayOfWeek
      );
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
