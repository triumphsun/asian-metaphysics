import * as guaModule from '@/cli/gua';
import { castHexagram } from '@/utils/divination';
import { Hexagram } from '@/models/Hexagram';

jest.mock('@/utils/divination');
jest.mock('@/models/Hexagram');
jest.mock('@/renderers/JsonRenderer');
jest.mock('@/renderers/AsciiRenderer');

describe('gua entrypoint', () => {
  let helpSpy: jest.SpyInstance;

  beforeEach(() => {
    helpSpy = jest.spyOn(guaModule, 'help').mockImplementation();

    (castHexagram as jest.Mock).mockReturnValue([7, 8, 7, 8, 7, 8]);
    (Hexagram.fromQuaternate as jest.Mock).mockReturnValue({
      metadata: { judgment: 'Test Judgment' },
      movingLineIndices: [1, 2],
    });
  });

  afterEach(() => {
    helpSpy.mockRestore();
    jest.clearAllMocks();
  });

  describe('call help()', () => {
    test('should call help and return when --help is provided', () => {
      guaModule.gua(['--help']);
      expect(helpSpy).toHaveBeenCalled();
      expect(castHexagram).not.toHaveBeenCalled();
    });

    test('should call help and return when -h is provided', () => {
      guaModule.gua(['-h']);
      expect(helpSpy).toHaveBeenCalled();
      expect(castHexagram).not.toHaveBeenCalled();
    });
  });

  test('should perform divination when no help flag is provided', () => {
    guaModule.gua([]);
    expect(castHexagram).toHaveBeenCalled();
    expect(helpSpy).not.toHaveBeenCalled();
  });

  test('help should print options via console.log', () => {
    helpSpy.mockRestore();
    const tempSpy = jest.spyOn(console, 'log').mockImplementation();
    guaModule.help();
    expect(tempSpy).toHaveBeenCalledWith(expect.stringContaining('usage: gua [options]'));
    expect(tempSpy).toHaveBeenCalledWith(expect.stringContaining('--json'));
    tempSpy.mockRestore();
  });
});
