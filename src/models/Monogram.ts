import { Binate, Quaternate } from '@/types/core';

export class Monogram {
  /**
   * @param isSolid 是否為陽爻 (True: 陽, False: 陰)
   * @param isMoving 是否為變爻 (True: Moving, False: Stable)
   */
  constructor(
    public readonly isSolid: boolean,
    public readonly isMoving: boolean = false,
  ) {}

  static fromBinate(val: Binate): Monogram {
    return new Monogram(val === Binate.SOLID, false);
  }

  static fromQuaternate(val: Quaternate): Monogram {
    const isSolid = val === Quaternate.STABLE_YANG || val === Quaternate.MOVING_YANG; // 判斷形狀：7(少陽) 與 9(老陽) 為陽
    const isMoving = val === Quaternate.MOVING_YIN || val === Quaternate.MOVING_YANG; // 判斷動靜：6(老陰) 與 9(老陽) 為 Moving
    return new Monogram(isSolid, isMoving);
  }
}
