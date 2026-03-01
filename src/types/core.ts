/**
 * Binate (二元狀態)
 * 用於描述爻的基礎物理形狀（陽爻或陰爻）。
 */
export enum Binate {
  DASHED = 0,
  SOLID = 1,
}

/**
 * Quaternate (動態四象狀態)
 * 用於描述占卜時的動靜狀態，直接對應變卦邏輯。
 */
export enum Quaternate {
  MOVING_YIN = 6, // 老陰
  STABLE_YANG = 7, // 少陽
  STABLE_YIN = 8, // 少陰
  MOVING_YANG = 9, // 老陽
}

/**
 * FiveElement (五行)
 * 貫穿卦象、天干、地支的統一五行系統。
 */
export enum FiveElement {
  Wood = 'Wood',
  Fire = 'Fire',
  Earth = 'Earth',
  Metal = 'Metal',
  Water = 'Water',
}

/**
 * 天干
 */
export enum HeavenlyStem {
  JIA = 0,
  YI,
  BING,
  DING,
  WU,
  JI,
  GENG,
  XIN,
  REN,
  GUI,
}

/**
 * 地支
 */
export enum EarthlyBranch {
  ZI = 0,
  CHOU,
  YIN,
  MAO,
  CHEN,
  SI,
  WU,
  WEI,
  SHEN,
  YOU,
  XU,
  HAI,
}
