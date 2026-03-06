import * as guaModule from '@/cli/gua';
import { castHexagram } from '@/utils/divination';
import { Hexagram } from '@/models/Hexagram';

jest.mock('@/utils/divination');
jest.mock('@/models/Hexagram');
jest.mock('@/renderers/JsonRenderer');
jest.mock('@/renderers/AsciiRenderer');

describe('gua entrypoint', () => {
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  let helpSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    helpSpy = jest.spyOn(guaModule, 'help').mockImplementation();

    (castHexagram as jest.Mock).mockReturnValue([7, 8, 7, 8, 7, 8]);
    (Hexagram.fromQuaternate as jest.Mock).mockReturnValue({
      metadata: { judgment: 'Test Judgment' },
      movingLineIndices: [1, 2],
    });
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    helpSpy.mockRestore();
    jest.clearAllMocks();
  });

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

  test('should show error and help when mutually exclusive flags are used', () => {
    guaModule.gua(['--help', '--json']);
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('不能同時使用'));
    expect(helpSpy).toHaveBeenCalled();
    expect(castHexagram).not.toHaveBeenCalled();
  });

  test('should perform divination when no help flag is provided', () => {
    guaModule.gua([]);
    expect(castHexagram).toHaveBeenCalled();
    expect(helpSpy).not.toHaveBeenCalled();
    // 檢查是否有任何輸出（因為 render 現在可能回傳空或 mock 值）
    expect(consoleLogSpy).toHaveBeenCalled();
  });

  test('help should print options via console.log', () => {
    helpSpy.mockRestore();
    const tempLogSpy = jest.spyOn(console, 'log').mockImplementation();
    guaModule.help();
    expect(tempLogSpy).toHaveBeenCalledWith(expect.stringContaining('usage: gua [options]'));
    expect(tempLogSpy).toHaveBeenCalledWith(expect.stringContaining('--json'));
    expect(tempLogSpy).toHaveBeenCalledWith(expect.stringContaining('--help, -h'));
    tempLogSpy.mockRestore();
  });
});
