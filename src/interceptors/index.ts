import { MetaphysicsInterceptor } from '@/services/MetaphysicsService';
import { Hexagram } from '@/models/Hexagram';

/**
 * 日誌攔截器：追蹤分析流程
 */
export const LoggingInterceptor: MetaphysicsInterceptor = {
  before: (hex: Hexagram) => {
    console.log(`[LOG] 🔮 開始分析卦象：【${hex.fullTitle}】 (Key: ${hex.binaryKey})`);
  },
  after: (hex: Hexagram, results: Hexagram[]) => {
    console.log(`[LOG] ✅ 分析完成。產生路徑數：${results.length}`);
    if (results.length === 1) {
      console.log(`[LOG] 變卦為：【${results[0].fullTitle}】`);
    }
  },
};

/**
 * 能量統計攔截器：分析演化結果的五行分佈
 */
export const EnergyStatsInterceptor: MetaphysicsInterceptor = {
  after: (_hex: Hexagram, results: Hexagram[]) => {
    const stats: Record<string, number> = {};

    results.forEach((res) => {
      // 透過 Hexagram -> Trigram -> Metadata 取得五行
      const element = res.upperTrigram.metadata?.element || 'Unknown';
      stats[element] = (stats[element] || 0) + 1;
    });

    console.log('--- ⚡ 演化路徑五行分佈統計 ---');
    Object.entries(stats).forEach(([el, count]) => {
      console.log(`${el}: ${'█'.repeat(count)} (${count})`);
    });
    console.log('------------------------------');
  },
};
