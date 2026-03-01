import { HexagramMetadata } from '@/types/metadata';
import { HEXAGRAM_DATA } from '@/constants/hexagrams';

import { Binate, Quaternate } from '@/types/core';
import { Monogram } from './Monogram';
import { Trigram } from './Trigram';

/**
 * Hexagram (大成卦 / 六十四卦)
 * 負責管理六爻邏輯、上下卦組合以及變卦生成。
 */
export class Hexagram {
  /**
   * @param monograms 六爻陣列，索引 0 為初爻 (最下方)，索引 5 為上爻 (最上方)
   */
  constructor(public readonly monograms: Monogram[]) {
    if (monograms.length !== 6) {
      throw new Error('Hexagram 必須由剛好 6 個 Monogram 組成。');
    }
  }

  static fromBinate(values: Binate[]): Hexagram {
    return new Hexagram(values.map((v) => Monogram.fromBinate(v)));
  }

  static fromQuaternate(values: Quaternate[]): Hexagram {
    return new Hexagram(values.map((v) => Monogram.fromQuaternate(v)));
  }

  /** 獲取下卦 (Lower / Inner Trigram) */
  get lowerTrigram(): Trigram {
    return new Trigram(this.monograms.slice(0, 3));
  }

  /** 獲取上卦 (Upper / Outer Trigram) */
  get upperTrigram(): Trigram {
    return new Trigram(this.monograms.slice(3, 6));
  }

  /** 取得二進位索引 Key (例如: "111000") */
  get binaryKey(): string {
    return this.monograms.map((m) => (m.isSolid ? '1' : '0')).join('');
  }

  /** 取得對應的 Metadata 資料 (卦辭、爻辭) */
  get metadata(): HexagramMetadata | undefined {
    return HEXAGRAM_DATA[this.binaryKey];
  }

  /**
   * 取得卦象全名 (例如: "地天泰" 或 "乾為天")
   * 邏輯：判斷上下卦是否相同，應用不同命名模板。
   */
  get fullTitle(): string {
    const data = this.metadata;
    if (!data) return '未知卦';

    const upper = this.upperTrigram;
    const lower = this.lowerTrigram;

    // 判斷是否為「八純卦」
    if (upper.binaryKey === lower.binaryKey) {
      return `${data.name}為${upper.nature}`;
    }

    // 一般重卦命名規則：上意象 + 下意象 + 卦名
    return `${upper.nature}${lower.nature}${data.name}`;
  }

  /**
   * 產生變卦 (Resultant Hexagram)
   * 將所有狀態為 Moving 的爻位進行翻轉，並將變卦後的爻設為 Stable。
   */
  get resultant(): Hexagram {
    const nextMonograms = this.monograms.map((m) => {
      // 僅翻轉發動爻 (Moving)，靜爻 (Stable) 維持原樣
      const nextSolid = m.isMoving ? !m.isSolid : m.isSolid;
      // 變卦產生的結果皆為靜態
      return new Monogram(nextSolid, false);
    });
    return new Hexagram(nextMonograms);
  }

  /**
   * 獲取發動爻的索引清單 (0-5)
   */
  get movingLineIndices(): number[] {
    return this.monograms.map((m, i) => (m.isMoving ? i : -1)).filter((i) => i !== -1);
  }
}
