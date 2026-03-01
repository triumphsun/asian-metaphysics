import { Hexagram } from '@/models/Hexagram';
import { TransformationStrategy, ResultantStrategies } from './strategies';

export interface MetaphysicsInterceptor {
  before?: (hex: Hexagram) => void;
  after?: (hex: Hexagram, results: Hexagram[]) => void;
}

export class MetaphysicsService {
  private interceptors: MetaphysicsInterceptor[] = [];

  constructor(private strategy: TransformationStrategy = ResultantStrategies.ChuHsi) {}

  public addInterceptor(interceptor: MetaphysicsInterceptor): void {
    this.interceptors.push(interceptor);
  }

  public setStrategy(strategy: TransformationStrategy): void {
    this.strategy = strategy;
  }

  public analyze(hex: Hexagram): Hexagram[] {
    this.interceptors.forEach((i) => i.before?.(hex));
    const results = this.strategy.execute(hex);
    this.interceptors.forEach((i) => i.after?.(hex, results));
    return results;
  }
}
