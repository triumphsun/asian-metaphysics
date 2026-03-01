import { FiveElement, Binate } from './core';

/**
 * 單一爻的文字資料與陳述
 */
export interface MonogramData {
  statement: string; // 爻辭原文（例如："潛龍勿用"）
  meaning: string; // 現代語意解析
}

/**
 * 小成卦 (三爻卦) Metadata 結構
 */
export interface TrigramMetadata {
  name: string; // 卦名（例如："乾"）
  symbol: string; // 符號（例如："☰"）
  nature: string; // 自然意象（例如："天"）
  element: FiveElement; // 五行屬性
}

/**
 * 大成卦 (六爻卦) Metadata 結構
 */
export interface HexagramMetadata {
  name: string; // 卦名單字（例如："泰"）
  index: number;
  judgment: string; // 卦辭（例如："小往大來，吉亨。"）
  monograms: MonogramData[]; // 使用物件陣列結構存放六爻資料，索引 0-5 對應初爻至上爻
}

/**
 * 天干地支 Metadata 結構
 */
export interface StemBranchData {
  name: string;
  element: FiveElement;
  polarity: Binate;
  zodiac?: string; // 僅地支使用
  hour?: string; // 僅地支使用
}
