import { DynamicModule, Module, Provider, Type } from '@nestjs/common';
import {
  PactProducerModuleAsyncOptions,
  PactProducerOptions,
  PactProducerOptionsFactory,
} from '../interfaces/pact-producer-module-options.interface';
import { PactVerifierService } from '../services/pact-verifier.service';
import { PactVerifierProvider } from '../providers/pact-verifier.provider';
import { PactModuleProviders } from '../common/pact-module-providers.enum';
import { ProviderFactory } from '../common/provider-factory';

@Module({})
export class PactProducerCoreModule {
  public static register(options: PactProducerOptions): DynamicModule {
    const optionsProvider = ProviderFactory.create(PactModuleProviders.ProducerOptions, options);

    return {
      module: PactProducerCoreModule,
      exports: [PactVerifierService],
      providers: [PactVerifierProvider, optionsProvider, PactVerifierService],
    };
  }

  public static registerAsync(options: PactProducerModuleAsyncOptions): DynamicModule {
    return {
      exports: [PactVerifierService],
      imports: options.imports,
      module: PactProducerCoreModule,
      providers: [...this.createAsyncProviders(options), PactVerifierProvider, PactVerifierService],
    };
  }

  private static createAsyncProviders(options: PactProducerModuleAsyncOptions): Provider[] {
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

  private static createAsyncOptionsProvider(options: PactProducerModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        inject: options.inject || [],
        provide: PactModuleProviders.ProducerOptions,
        useFactory: options.useFactory,
      };
    }

    const inject = [(options.useClass || options.useExisting) as Type<PactProducerOptionsFactory>];

    return {
      provide: PactModuleProviders.ProducerOptions,
      useFactory: async (optionsFactory: PactProducerOptionsFactory) =>
        await optionsFactory.createPactProducerOptions(),
      inject,
    };
  }
}
