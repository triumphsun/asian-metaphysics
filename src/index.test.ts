import * as index from '@/index';
import * as divinationUtils from '@/utils/divination';

describe('index functions', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    jest.clearAllMocks();
  });

  describe('help function', () => {
    test('should log usage instructions', () => {
      index.help();
      const calls = consoleSpy.mock.calls.map((call) => call[0]);
      expect(calls.some((msg) => msg && msg.includes('usage:'))).toBe(true);
    });
  });

  describe('divination function', () => {
    test('should execute divination and log result', () => {
      const mockResult = [6, 7, 8, 9, 7, 8];
      jest.spyOn(divinationUtils, 'castHexagram').mockReturnValue(mockResult);

      index.divination();

      expect(consoleSpy).toHaveBeenCalled();
      const calls = consoleSpy.mock.calls.map((call) => call[0]);
      expect(calls.some((msg) => msg && typeof msg === 'string' && msg.includes('卦辭'))).toBe(
        true,
      );
      expect(
        calls.some((msg) => msg && typeof msg === 'string' && msg.includes('重點變爻索引')),
      ).toBe(true);
    });
  });

  describe('main function', () => {
    const originalArgv = process.argv;
    let helpSpy: jest.SpyInstance;
    let divinationSpy: jest.SpyInstance;

    beforeEach(() => {
      // Mocking exported functions to track their calls
      helpSpy = jest.spyOn(index, 'help').mockImplementation(() => {});
      divinationSpy = jest.spyOn(index, 'divination').mockImplementation(() => {});
    });

    afterEach(() => {
      process.argv = originalArgv;
      helpSpy.mockRestore();
      divinationSpy.mockRestore();
    });

    test('should call divination() when first argument is "divination"', () => {
      process.argv = ['node', 'index.js', 'divination'];

      index.main();

      expect(divinationSpy).toHaveBeenCalled();
      expect(helpSpy).not.toHaveBeenCalled();
    });

    test('should call help() when first argument is not "divination"', () => {
      process.argv = ['node', 'index.js', 'other'];

      index.main();

      expect(helpSpy).toHaveBeenCalled();
      expect(divinationSpy).not.toHaveBeenCalled();
    });

    test('should call help() when no arguments are provided', () => {
      process.argv = ['node', 'index.js'];

      index.main();

      expect(helpSpy).toHaveBeenCalled();
      expect(divinationSpy).not.toHaveBeenCalled();
    });
  });
});
