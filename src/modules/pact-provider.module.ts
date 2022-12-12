import { DynamicModule, Module } from '@nestjs/common';

import { VerifierOptions } from '@pact-foundation/pact';

import { PactProviderModuleAsyncOptions } from '../interfaces/pact-provider-module-options.interface';

import { PactProviderCoreModule } from './pact-provider-core.module';

@Module({})
export class PactProviderModule {
  public static register(options: VerifierOptions) {
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
