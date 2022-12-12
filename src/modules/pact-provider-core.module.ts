import { DynamicModule, Module, Provider, Type } from '@nestjs/common';

import { VerifierOptions } from '@pact-foundation/pact';

import {
  PactProviderModuleAsyncOptions,
  PactProviderOptionsFactory,
} from '../interfaces/pact-provider-module-options.interface';
import { PactVerifierService } from '../services/pact-verifier.service';
import { PactModuleProviders } from '../common/pact-module-providers.enum';
import { ProviderFactory } from '../common/provider-factory';
import { PactVerifierProvider } from '../providers/pact-verifier.provider';

@Module({})
export class PactProviderCoreModule {
  public static register(options: VerifierOptions): DynamicModule {
    const optionsProvider = ProviderFactory.create(PactModuleProviders.ProviderOptions, options);

    return {
      module: PactProviderCoreModule,
      exports: [PactVerifierService, PactVerifierProvider],
      providers: [optionsProvider, PactVerifierService, PactVerifierProvider],
    };
  }

  public static registerAsync(options: PactProviderModuleAsyncOptions): DynamicModule {
    return {
      exports: [PactVerifierService, PactVerifierProvider],
      imports: options.imports,
      module: PactProviderCoreModule,
      providers: [...this.createAsyncProviders(options), PactVerifierService, PactVerifierProvider],
    };
  }

  private static createAsyncProviders(options: PactProviderModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    const { useClass } = options;

    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(options: PactProviderModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        inject: options.inject || [],
        provide: PactModuleProviders.ProviderOptions,
        useFactory: options.useFactory,
      };
    }

    const inject = [(options.useClass || options.useExisting) as Type<PactProviderOptionsFactory>];

    return {
      provide: PactModuleProviders.ProviderOptions,
      useFactory: async (optionsFactory: PactProviderOptionsFactory) =>
        await optionsFactory.createPactProviderOptions(),
      inject,
    };
  }
}
