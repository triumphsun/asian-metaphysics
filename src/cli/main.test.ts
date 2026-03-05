import * as guaModule from '@/cli/gua';
import * as mainModule from './main';

describe('main cli entrypoint', () => {
  const originalArgv = process.argv;
  let guaSpy: jest.SpyInstance;
  let helpSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.resetModules();
    process.argv = [...originalArgv];
    guaSpy = jest.spyOn(guaModule, 'gua').mockImplementation();
    helpSpy = jest.spyOn(mainModule, 'help').mockImplementation();
  });

  afterEach(() => {
    process.argv = originalArgv;
    guaSpy.mockRestore();
    helpSpy.mockRestore();
    jest.clearAllMocks();
  });

  test('main should call gua with remaining args when subCommand is "gua"', () => {
    process.argv = ['node', 'index.js', 'gua', '--json'];
    mainModule.main();
    expect(guaSpy).toHaveBeenCalledWith(['--json']);
    expect(helpSpy).not.toHaveBeenCalled();
  });

  test('main should call help when subCommand is not "gua"', () => {
    process.argv = ['node', 'index.js', 'unknown'];
    mainModule.main();
    expect(helpSpy).toHaveBeenCalled();
    expect(guaSpy).not.toHaveBeenCalled();
  });

  test('main should call help when no subCommand is provided', () => {
    process.argv = ['node', 'index.js'];
    mainModule.main();
    expect(helpSpy).toHaveBeenCalled();
    expect(guaSpy).not.toHaveBeenCalled();
  });
});
