import { Hexagram } from '@/models/Hexagram';
import { Monogram } from '@/models/Monogram';

export interface TransformationStrategy {
  execute(hex: Hexagram): Hexagram[];
}

function getPowerSet(arr: number[]): number[][] {
  return arr
    .reduce(
      (subsets, value) => subsets.concat(subsets.map((set) => [...set, value])),
      [[] as number[]],
    )
    .filter((set) => set.length > 0);
}

export const ResultantStrategies = {
  /**
   * 1. 朱熹標準斷法 (Chu Hsi Method)
   * 邏輯：基於傳統學術規範，產生物理上的單一變卦結果。
   */
  ChuHsi: {
    execute(hex: Hexagram): Hexagram[] {
      // 直接回傳本卦翻轉所有發動爻後的唯一變卦
      return [hex.resultant];
    },
  } as TransformationStrategy,

  /**
   * 2. 全路徑探索 (Full Path Discovery)
   * 邏輯：根據動爻數量產生所有可能的演化組合 (2^n - 1)。
   */
  FullPath: {
    execute(hex: Hexagram): Hexagram[] {
      const movingIndices = hex.movingLineIndices;

      if (movingIndices.length === 0) {
        return [hex]; // 無變爻則回傳本卦
      }

      // 取得所有變爻位置的冪集組合
      const combinations = getPowerSet(movingIndices);

      return combinations.map((indices) => {
        const nextMonograms = hex.monograms.map((m, i) => {
          // 如果目前的索引在該組合中，則翻轉
          const shouldFlip = indices.includes(i);
          return new Monogram(shouldFlip ? !m.isSolid : m.isSolid, false);
        });
        return new Hexagram(nextMonograms);
      });
    },
  } as TransformationStrategy,
};
