import { ValueProvider } from '@nestjs/common';

export class ProviderFactory {
  public static create<T = any>(token: string, value: T): ValueProvider<T> {
    return {
      provide: token,
      useValue: value,
    };
  }
}
