import { formatDate, formatTime, parseBrazilianDateTime } from '../dateUtils';

describe('dateUtils', () => {
    describe('formatDate', () => {
        it('should format date correctly', () => {
            const date = new Date(2023, 0, 1); // Jan 1, 2023
            expect(formatDate(date)).toBe('01/01/2023');
        });

        it('should pad single digit day and month with zeros', () => {
            const date = new Date(2023, 5, 7); // June 7, 2023
            expect(formatDate(date)).toBe('07/06/2023');
        });
    });

    describe('formatTime', () => {
        it('should format time correctly', () => {
            const date = new Date(2023, 0, 1, 14, 30); // 2:30 PM
            expect(formatTime(date)).toBe('14:30');
        });

        it('should pad single digit hours and minutes with zeros', () => {
            const date = new Date(2023, 0, 1, 9, 5); // 9:05 AM
            expect(formatTime(date)).toBe('09:05');
        });
    });

    describe('parseBrazilianDateTime', () => {
        it('should parse valid date and time', () => {
            const result = parseBrazilianDateTime('01/02/2023', '14:30');
            expect(result.getFullYear()).toBe(2023);
            expect(result.getMonth()).toBe(1); // February (0-indexed)
            expect(result.getDate()).toBe(1);
            expect(result.getHours()).toBe(14);
            expect(result.getMinutes()).toBe(30);
        });

        it('should throw error for invalid date format', () => {
            expect(() => {
                parseBrazilianDateTime('01-02-2023', '14:30');
            }).toThrow('Invalid date or time format');
        });

        it('should throw error for invalid time format', () => {
            expect(() => {
                parseBrazilianDateTime('01/02/2023', '14.30');
            }).toThrow('Invalid date or time format');
        });

        it('should throw error for invalid date values', () => {
            expect(() => {
                parseBrazilianDateTime('32/02/2023', '14:30');
            }).toThrow('Invalid date or time');
        });
    });
});
