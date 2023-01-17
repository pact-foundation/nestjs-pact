import { DynamicModule, Module } from '@nestjs/common';

import {
  PactProviderModuleAsyncOptions,
  PactProviderOptions,
} from '../interfaces/pact-provider-module-options.interface';

import { PactProviderCoreModule } from './pact-provider-core.module';

@Module({})
export class PactProviderModule {
  public static register(options: PactProviderOptions) {
    return {
      module: PactProviderModule,
      imports: [PactProviderCoreModule.register(options)],
    };
  }

  public static registerAsync(options: PactProviderModuleAsyncOptions): DynamicModule {
    return {
      module: PactProviderModule,
      imports: [PactProviderCoreModule.registerAsync(options)],
    };
  }
}
