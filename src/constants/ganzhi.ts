import { StemBranchData } from '@/types/metadata';
import { FiveElement, Binate, HeavenlyStem, EarthlyBranch } from '@/types/core';

export const HEAVENLY_STEMS: Record<HeavenlyStem, StemBranchData> = {
  [HeavenlyStem.JIA]: { name: '甲', element: FiveElement.Wood, polarity: Binate.SOLID },
  [HeavenlyStem.YI]: { name: '乙', element: FiveElement.Wood, polarity: Binate.DASHED },
  [HeavenlyStem.BING]: { name: '丙', element: FiveElement.Fire, polarity: Binate.SOLID },
  [HeavenlyStem.DING]: { name: '丁', element: FiveElement.Fire, polarity: Binate.DASHED },
  [HeavenlyStem.WU]: { name: '戊', element: FiveElement.Earth, polarity: Binate.SOLID },
  [HeavenlyStem.JI]: { name: '己', element: FiveElement.Earth, polarity: Binate.DASHED },
  [HeavenlyStem.GENG]: { name: '庚', element: FiveElement.Metal, polarity: Binate.SOLID },
  [HeavenlyStem.XIN]: { name: '辛', element: FiveElement.Metal, polarity: Binate.DASHED },
  [HeavenlyStem.REN]: { name: '壬', element: FiveElement.Water, polarity: Binate.SOLID },
  [HeavenlyStem.GUI]: { name: '癸', element: FiveElement.Water, polarity: Binate.DASHED },
};

export const EARTHLY_BRANCHES: Record<EarthlyBranch, StemBranchData> = {
  [EarthlyBranch.ZI]: {
    name: '子',
    element: FiveElement.Water,
    polarity: Binate.SOLID,
    zodiac: '鼠',
    hour: '23-01',
  },
  [EarthlyBranch.CHOU]: {
    name: '丑',
    element: FiveElement.Earth,
    polarity: Binate.DASHED,
    zodiac: '牛',
    hour: '01-03',
  },
  [EarthlyBranch.YIN]: {
    name: '寅',
    element: FiveElement.Wood,
    polarity: Binate.SOLID,
    zodiac: '虎',
    hour: '03-05',
  },
  [EarthlyBranch.MAO]: {
    name: '卯',
    element: FiveElement.Wood,
    polarity: Binate.DASHED,
    zodiac: '兔',
    hour: '05-07',
  },
  [EarthlyBranch.CHEN]: {
    name: '辰',
    element: FiveElement.Earth,
    polarity: Binate.SOLID,
    zodiac: '龍',
    hour: '07-09',
  },
  [EarthlyBranch.SI]: {
    name: '巳',
    element: FiveElement.Fire,
    polarity: Binate.DASHED,
    zodiac: '蛇',
    hour: '09-11',
  },
  [EarthlyBranch.WU]: {
    name: '午',
    element: FiveElement.Fire,
    polarity: Binate.SOLID,
    zodiac: '馬',
    hour: '11-13',
  },
  [EarthlyBranch.WEI]: {
    name: '未',
    element: FiveElement.Earth,
    polarity: Binate.DASHED,
    zodiac: '羊',
    hour: '13-15',
  },
  [EarthlyBranch.SHEN]: {
    name: '申',
    element: FiveElement.Metal,
    polarity: Binate.SOLID,
    zodiac: '猴',
    hour: '15-17',
  },
  [EarthlyBranch.YOU]: {
    name: '酉',
    element: FiveElement.Metal,
    polarity: Binate.DASHED,
    zodiac: '雞',
    hour: '17-19',
  },
  [EarthlyBranch.XU]: {
    name: '戌',
    element: FiveElement.Earth,
    polarity: Binate.SOLID,
    zodiac: '狗',
    hour: '19-21',
  },
  [EarthlyBranch.HAI]: {
    name: '亥',
    element: FiveElement.Water,
    polarity: Binate.DASHED,
    zodiac: '豬',
    hour: '21-23',
  },
};
