export function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export function formatTime(date: Date): string {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

export function parseBrazilianDateTime(dateStr: string, timeStr: string): Date {
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

    // Basic validations for day/month/year ranges
    if (day < 1 || day > 31 || month < 0 || month > 11 || year < 0 ||
        hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        throw new Error('Invalid date or time');
    }

    // Create date object and verify it's valid
    const dateObj = new Date(year, month, day, hours, minutes);

    // Additional check: if the month changed, it means the day was invalid for that month
    if (dateObj.getMonth() !== month || dateObj.getDate() !== day) {
        throw new Error('Invalid date or time');
    }

    if (isNaN(dateObj.getTime())) {
        throw new Error('Invalid date or time');
    }

    return dateObj;
}
