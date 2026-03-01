import { TrigramMetadata } from '@/types/metadata';
import { FiveElement } from '@/types/core';

/**
 * 三爻卦 (Trigram) Metadata
 * Key 為二進位字串（從初爻到三爻）
 */
export const TRIGRAM_DATA: Record<string, TrigramMetadata> = {
  '111': { name: '乾', symbol: '☰', nature: '天', element: FiveElement.Metal },
  '000': { name: '坤', symbol: '☷', nature: '地', element: FiveElement.Earth },
  '100': { name: '震', symbol: '☳', nature: '雷', element: FiveElement.Wood },
  '011': { name: '巽', symbol: '☴', nature: '風', element: FiveElement.Wood },
  '010': { name: '坎', symbol: '☵', nature: '水', element: FiveElement.Water },
  '101': { name: '離', symbol: '☲', nature: '火', element: FiveElement.Fire },
  '001': { name: '艮', symbol: '☶', nature: '山', element: FiveElement.Earth },
  '110': { name: '兌', symbol: '☱', nature: '澤', element: FiveElement.Metal },
};
