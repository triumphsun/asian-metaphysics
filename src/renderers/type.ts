import { Hexagram } from '@/models/Hexagram';

export interface GuaRenderer<T> {
  render(hex: Hexagram): T;
}
