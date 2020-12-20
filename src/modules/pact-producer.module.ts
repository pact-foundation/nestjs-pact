import { DynamicModule, Module } from '@nestjs/common';
import { PactProducerCoreModule } from './pact-producer-core.module';
import {
  PactProducerModuleAsyncOptions,
  PactProducerOptions,
} from '../interfaces/pact-producer-module-options.interface';

@Module({})
export class PactProducerModule {
  public static register(options: PactProducerOptions) {
    return {
      module: PactProducerModule,
      imports: [PactProducerCoreModule.register(options)],
    };
  }

  public static registerAsync(options: PactProducerModuleAsyncOptions): DynamicModule {
    return {
      module: PactProducerModule,
      imports: [PactProducerCoreModule.registerAsync(options)],
    };
  }
}
