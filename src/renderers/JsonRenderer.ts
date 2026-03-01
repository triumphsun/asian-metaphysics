import { GuaRenderer } from '@/renderers/type';
import { Hexagram } from '@/models/Hexagram';

export class JsonRenderer implements GuaRenderer<string> {
  // eslint-disable-next-line class-methods-use-this
  render(hex: Hexagram): string {
    const data = {
      index: hex.metadata?.index,
      title: hex.fullTitle,
      binaryKey: hex.binaryKey,
      expansion: hex.monograms
        .map((m) => {
          if (m.isMoving) {
            return m.isSolid ? 9 : 6;
          }
          return m.isSolid ? 7 : 8;
        })
        .join(''),
    };

    return JSON.stringify(data, null, 2);
  }
}
