import { GuaRenderer } from '@/renderers/type';
import { Hexagram } from '@/models/Hexagram';

export class AsciiRenderer implements GuaRenderer<string> {
  // eslint-disable-next-line class-methods-use-this
  render(hex: Hexagram): string {
    const lines = [...hex.monograms].reverse().map((m, i) => {
      const pos = 6 - i;
      const symbol = m.isSolid ? '━━━━━━━━━' : '━━━   ━━━';
      const moving = m.isMoving ? '*' : ' ';
      return `${pos} ${symbol} ${moving}`;
    });

    return [
      '--------------',
      `【${hex.metadata?.index}.${hex.fullTitle}】`,
      '--------------',
      ...lines,
      '--------------',
    ].join('\n');
  }
}
