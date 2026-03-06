import { GuaRenderer } from '@/renderers/type';
import { Hexagram } from '@/models/Hexagram';

export class SvgRenderer implements GuaRenderer<string> {
  // eslint-disable-next-line class-methods-use-this
  render(hex: Hexagram): string {
    const barWidth = 200;
    const barHeight = 20;
    const gap = 10;

    const svgLines = [...hex.monograms].reverse().map((m, i) => {
      const y = i * (barHeight + gap);
      if (m.isSolid) {
        return `<rect x="0" y="${y}" width="${barWidth}" height="${barHeight}" fill="black"/>`;
      }

      const half = (barWidth - 40) / 2;
      return (
        `<rect x="0" y="${y}" width="${half}" height="${barHeight}" fill="black"/>
        <rect x="${half + 40}" y="${y}" width="${half}" height="${barHeight}" fill="black"/>`
      );
    });

    return (
      `<svg width="${barWidth}" height="${6 * (barHeight + gap)}" xmlns="http://www.w3.org/2000/svg">
        <title>${hex.fullTitle}</title>
        ${svgLines.join('')}
      </svg>`
    );
  }
}
