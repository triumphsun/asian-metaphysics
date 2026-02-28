import { greet } from '@/utils/greet';

describe('greet function', () => {
  test('should return "Hello, World" when input is "World"', () => {
    expect(greet('World')).toBe('Hello, World');
  });

  test('should return "Hello, Gemini" when input is "Gemini"', () => {
    expect(greet('Gemini')).toBe('Hello, Gemini');
  });
});
