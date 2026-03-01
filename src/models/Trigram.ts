import { TrigramMetadata } from '@/types/metadata';
import { TRIGRAM_DATA } from '@/constants/trigrams';

import { Binate, Quaternate } from '@/types/core';
import { Monogram } from './Monogram';

export class Trigram {
  /**
   * @param monograms 三爻陣列 (初、二、三)
   */
  constructor(public readonly monograms: Monogram[]) {
    if (monograms.length !== 3) {
      throw new Error('Trigram must consist of exactly 3 monograms.');
    }
  }

  static fromBinate(values: Binate[]): Trigram {
    return new Trigram(values.map((v) => Monogram.fromBinate(v)));
  }

  static fromQuaternate(values: Quaternate[]): Trigram {
    return new Trigram(values.map((v) => Monogram.fromQuaternate(v)));
  }

  /** 取得二進位索引 Key (例如: "111") */
  get binaryKey(): string {
    return this.monograms.map((m) => (m.isSolid ? '1' : '0')).join('');
  }

  /** 取得對應的 Metadata (含卦名、五行、自然意象) */
  get metadata(): TrigramMetadata | undefined {
    return TRIGRAM_DATA[this.binaryKey];
  }

  /** 取得卦名 (例如: "乾") */
  get name(): string {
    return this.metadata?.name || 'Unknown';
  }

  /** 取得自然意象 (例如: "天") */
  get nature(): string {
    return this.metadata?.nature || '?';
  }
}
