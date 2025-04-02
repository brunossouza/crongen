export type Frequency = 'once' | 'daily' | 'weekly' | 'monthly';

export function generateCronExpression(
    frequency: Frequency,
    minutes: number,
    hours: number,
    dayOfMonth: number,
    month: number,
    dayOfWeek: number
): string {
    switch (frequency) {
        case 'once':
            return `${minutes} ${hours} ${dayOfMonth} ${month} ${dayOfWeek}`;
        case 'daily':
            return `${minutes} ${hours} * * *`;
        case 'weekly':
            return `${minutes} ${hours} * * ${dayOfWeek}`;
        case 'monthly':
            return `${minutes} ${hours} ${dayOfMonth} * *`;
        default:
            throw new Error('Invalid frequency');
    }
}

export function generateExplanation(
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
