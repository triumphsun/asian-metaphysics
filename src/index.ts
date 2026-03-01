import { Hexagram } from '@/models/Hexagram';
import { LoggingInterceptor, EnergyStatsInterceptor } from '@/interceptors';
import { ResultantStrategies } from '@/services/strategies';
import { MetaphysicsService } from '@/services/MetaphysicsService';
import { castHexagram } from '@/utils/divination';
import { AsciiRenderer } from '@/renderers/AsciiRenderer';
import { JsonRenderer } from '@/renderers/JsonRenderer';
import { GuaRenderer } from '@/renderers/type';

export const help = () => {
  console.log('usage:');
  console.log('  divination    Cast a hexagram and see the result');
  console.log('  help          Show this help message');
};

export const divination = () => {
  const divinationResult = castHexagram();
  const myHex = Hexagram.fromQuaternate(divinationResult);

  const json: GuaRenderer<string> = new JsonRenderer();
  console.log('\r\n>>> JSON Output:');
  console.log(json.render(myHex));

  const ascii: GuaRenderer<string> = new AsciiRenderer();
  console.log('\r\n\r\n>>> ASCII Output:');
  console.log(ascii.render(myHex));

  console.log('\r\n\r\n>>> Details:');
  console.log(`卦辭：${myHex.metadata?.judgment}`);
  console.log(`重點變爻索引：${myHex.movingLineIndices.join(', ')}`);
  // transformWithChuHsi(myHex);
  // transformWithFullPaths(myHex);
};

// eslint-disable-next-line
export const transformWithChuHsi = (myHex: Hexagram) => {
  const engine = new MetaphysicsService(ResultantStrategies.ChuHsi);
  engine.addInterceptor(LoggingInterceptor);
  engine.addInterceptor(EnergyStatsInterceptor);
  console.log('\r\n>>> 模式 1：朱熹標準斷法 (唯一結果)');
  const standardResult = engine.analyze(myHex);
  console.log(`變卦結果：【${standardResult[0].fullTitle}】`);
};

// eslint-disable-next-line
export const transformWithFullPaths = (myHex: Hexagram) => {
  const engine = new MetaphysicsService(ResultantStrategies.FullPath);
  engine.addInterceptor(LoggingInterceptor);
  engine.addInterceptor(EnergyStatsInterceptor);
  console.log('\r\n>>> 模式 2：全路徑演化模式 (所有可能性)');
  engine.setStrategy(ResultantStrategies.FullPath);
  const allPaths = engine.analyze(myHex);

  allPaths.forEach((path, index) => {
    console.log(`[路徑 ${index + 1}]：${path.fullTitle} (${path.binaryKey})`);
  });
};

export const main = () => {
  const args = process.argv.slice(2);
  if (args[0] === 'divination') {
    divination();
  } else {
    help();
  }
};

if (require.main === module) {
  main();
}
