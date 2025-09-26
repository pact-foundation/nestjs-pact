import { DynamicModule, Module } from '@nestjs/common';

import {
  PactConsumerModuleAsyncOptions,
  PactConsumerOverallOptions,
  PactV2ConsumerModuleAsyncOptions,
  PactV2ConsumerOverallOptions,
  PactV3ConsumerModuleAsyncOptions,
  PactV3ConsumerOverallOptions,
} from '../interfaces/pact-consumer-module-options.interface';

import {
  PactConsumerCoreModule,
  PactV2ConsumerCoreModule,
  PactV3ConsumerCoreModule,
} from './pact-consumer-core.module';

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

@Module({})
export class PactV2ConsumerModule {
  public static register(options: PactV2ConsumerOverallOptions) {
    return {
      module: PactV2ConsumerModule,
      imports: [PactV2ConsumerCoreModule.register(options)],
    };
  }

  public static registerAsync(options: PactV2ConsumerModuleAsyncOptions): DynamicModule {
    return {
      module: PactV2ConsumerModule,
      imports: [PactV2ConsumerCoreModule.registerAsync(options)],
    };
  }
}

@Module({})
export class PactV3ConsumerModule {
  public static register(options: PactV3ConsumerOverallOptions) {
    return {
      module: PactV3ConsumerModule,
      imports: [PactV3ConsumerCoreModule.register(options)],
    };
  }

  public static registerAsync(options: PactV3ConsumerModuleAsyncOptions): DynamicModule {
    return {
      module: PactV3ConsumerModule,
      imports: [PactV3ConsumerCoreModule.registerAsync(options)],
    };
  }
}
