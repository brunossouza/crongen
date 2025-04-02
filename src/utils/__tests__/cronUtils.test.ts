import { generateCronExpression, generateExplanation, Frequency } from '../cronUtils';

describe('cronUtils', () => {
    describe('generateCronExpression', () => {
        it('should generate correct expression for once frequency', () => {
            const result = generateCronExpression('once', 30, 14, 15, 6, 2);
            expect(result).toBe('30 14 15 6 2');
        });

        it('should generate correct expression for daily frequency', () => {
            const result = generateCronExpression('daily', 30, 14, 15, 6, 2);
            expect(result).toBe('30 14 * * *');
        });

        it('should generate correct expression for weekly frequency', () => {
            const result = generateCronExpression('weekly', 30, 14, 15, 6, 2);
            expect(result).toBe('30 14 * * 2');
        });

        it('should generate correct expression for monthly frequency', () => {
            const result = generateCronExpression('monthly', 30, 14, 15, 6, 2);
            expect(result).toBe('30 14 15 * *');
        });
    });

    describe('generateExplanation', () => {
        it('should generate correct explanation for once frequency', () => {
            const result = generateExplanation('once', 30, 14, 15, 6, 2);
            expect(result).toContain('14:30');
            expect(result).toContain('15/06');
            expect(result).toContain('terça-feira');
        });

        it('should generate correct explanation for daily frequency', () => {
            const result = generateExplanation('daily', 30, 14, 15, 6, 2);
            expect(result).toContain('todos os dias às');
            expect(result).toContain('14:30');
        });

        it('should generate correct explanation for weekly frequency', () => {
            const result = generateExplanation('weekly', 30, 14, 15, 6, 2);
            expect(result).toContain('toda terça-feira');
            expect(result).toContain('14:30');
        });

        it('should generate correct explanation for monthly frequency', () => {
            const result = generateExplanation('monthly', 30, 14, 15, 6, 2);
            expect(result).toContain('todo dia 15 de cada mês');
            expect(result).toContain('14:30');
        });
    });
});
