import { Hexagram } from '@/models/Hexagram';
import { LoggingInterceptor, EnergyStatsInterceptor } from '@/interceptors';
import { ResultantStrategies } from '@/services/strategies';
import { MetaphysicsService } from '@/services/MetaphysicsService';
import { castHexagram } from '@/utils/divination';
import { AsciiRenderer } from '@/renderers/AsciiRenderer';
import { JsonRenderer } from '@/renderers/JsonRenderer';
import { GuaRenderer } from '@/renderers/type';
import { printAligned, HelpItem, parseFlags, validateFlags, mutuallyExclusive } from '@/utils/cli';

type GuaFlag = 'HELP' | 'JSON' | 'TEXT';

interface FlagConfig {
  flag: GuaFlag;
  aliases: string[];
  description: string;
}

const GUA_CONFIG: FlagConfig[] = [
  { flag: 'JSON', aliases: ['--json'], description: 'Output in JSON format only' },
  { flag: 'TEXT', aliases: ['--text'], description: 'Include ASCII and details output' },
  { flag: 'HELP', aliases: ['--help', '-h'], description: 'Show this help message for gua' },
];

// 動態生成解析用的映射表
const GUA_FLAG_MAP: Record<string, GuaFlag> = GUA_CONFIG.reduce(
  (acc, { flag, aliases }) => {
    aliases.forEach((alias) => {
      acc[alias] = flag;
    });
    return acc;
  },
  {} as Record<string, GuaFlag>,
);

// 動態生成幫助訊息列表
const GUA_HELP_ITEMS: HelpItem[] = GUA_CONFIG.map(({ aliases, description }) => ({
  label: aliases.join(', '),
  description,
}));

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

export const help = () => {
  console.log('usage: gua [options]');
  console.log('\r\noptions:');
  printAligned(GUA_HELP_ITEMS);
};

export const gua = (args: string[] = []) => {
  const flags = parseFlags(args, GUA_FLAG_MAP);
  const error = validateFlags<GuaFlag>(flags, [
    mutuallyExclusive<GuaFlag>(['HELP', 'JSON']),
    mutuallyExclusive<GuaFlag>(['HELP', 'TEXT']),
  ]);

  if (error) {
    console.error(error);
    help();
    return;
  }

  if (flags.has('HELP')) {
    help();
    return;
  }

  const divinationResult = castHexagram();
  const myHex = Hexagram.fromQuaternate(divinationResult);

  const json: GuaRenderer<string> = new JsonRenderer();
  console.log(json.render(myHex).replace(/\s/g, ''));

  if (flags.has('TEXT')) {
    const ascii: GuaRenderer<string> = new AsciiRenderer();
    console.log('\r\n\r\n>>> ASCII Output:');
    console.log(ascii.render(myHex));

    console.log('\r\n\r\n>>> Details:');
    console.log(`卦辭：${myHex.metadata?.judgment}`);
    console.log(`重點變爻索引：${myHex.movingLineIndices.join(', ')}`);
  }
};
