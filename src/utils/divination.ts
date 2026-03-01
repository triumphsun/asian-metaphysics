import { Quaternate } from '@/types/core';

/**
 * 一變的過程：分二、掛一、揲四、歸奇
 */
function performOneChange(currentStalks: number): number {
  // 1. 分二：隨機分為左右兩組 (象兩儀)
  const left = Math.floor(Math.random() * (currentStalks - 3)) + 1;
  let right = currentStalks - left;

  // 2. 掛一：從右邊取出一根 (象三才)
  right -= 1;

  // 3. 揲四：左右各以四除之 (象四時)
  let leftRemainder = left % 4;
  if (leftRemainder === 0) leftRemainder = 4;

  let rightRemainder = right % 4;
  if (rightRemainder === 0) rightRemainder = 4;

  // 4. 歸奇：扣掉餘數與掛掉的那一根
  return currentStalks - (leftRemainder + rightRemainder + 1);
}

/**
 * 模擬大衍之數揲蓍法
 * 邏輯：三變而成一爻
 */
export const dayingDivination = (): Quaternate => {
  let stalks = 49; // 大衍之數五十，其用四十有九

  // 進行「三變」
  for (let i = 0; i < 3; i += 1) {
    stalks = performOneChange(stalks);
  }

  // 最後剩餘的蓍草數除以 4，即為爻象 (6, 7, 8, 9)
  const result = stalks / 4;

  return result as Quaternate;
};

/**
 * 完整求卦：連續執行六次得到一個 Hexagram 實例
 */
export const castHexagram = (): Quaternate[] => {
  const hex: number[] = [];
  for (let i = 0; i < 6; i += 1) {
    hex.push(dayingDivination());
  }
  return hex;
};
