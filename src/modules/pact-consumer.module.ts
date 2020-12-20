import { DynamicModule, Module } from '@nestjs/common';
import {
  PactConsumerModuleAsyncOptions,
  PactConsumerOverallOptions,
} from '../interfaces/pact-consumer-module-options.interface';
import { PactConsumerCoreModule } from './pact-consumer-core.module';

@Module({})
export class PactConsumerModule {
  public static register(options: PactConsumerOverallOptions) {
    return {
      module: PactConsumerModule,
      imports: [PactConsumerCoreModule.register(options)],
    };
  }

  public static registerAsync(options: PactConsumerModuleAsyncOptions): DynamicModule {
    return {
      module: PactConsumerModule,
      imports: [PactConsumerCoreModule.registerAsync(options)],
    };
  }
}
