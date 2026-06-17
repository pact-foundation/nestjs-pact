import { DynamicModule, Module, Provider, Type } from '@nestjs/common';

import {
  PactConsumerModuleAsyncOptions,
  PactV2ConsumerModuleAsyncOptions,
  PactV3ConsumerModuleAsyncOptions,
  PactConsumerOptionsFactory,
  PactV2ConsumerOptionsFactory,
  PactV3ConsumerOptionsFactory,
  PactConsumerOverallOptions,
  PactV2ConsumerOverallOptions,
  PactV3ConsumerOverallOptions,
} from '../interfaces/pact-consumer-module-options.interface';
import { PactProvider, PactV2Provider, PactV3Provider } from '../providers/pact.provider';
import { PactFactory, PactV2Factory, PactV3Factory } from '../services/pact-factory.service';
import { PactModuleProviders } from '../common/pact-module-providers.enum';
import { ProviderFactory } from '../common/provider-factory';

@Module({})
export class PactConsumerCoreModule {
  public static register(options: PactConsumerOverallOptions): DynamicModule {
    const consumerOptProvider = ProviderFactory.create(PactModuleProviders.ConsumerOptions, options.consumer);

    return {
      module: PactConsumerCoreModule,
      exports: [PactFactory],
      providers: [consumerOptProvider, PactProvider, PactFactory],
    };
  }

  public static registerAsync(options: PactConsumerModuleAsyncOptions): DynamicModule {
    return {
      module: PactConsumerCoreModule,
      exports: [PactFactory],
      imports: options.imports,
      providers: [...this.createAsyncProviders(options), PactProvider, PactFactory],
    };
  }

  private static createAsyncProviders(options: PactConsumerModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return this.createAsyncOptionsProviders(options);
    }

    const { useClass } = options;

    return [
      ...this.createAsyncOptionsProviders(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProviders(options: PactConsumerModuleAsyncOptions): Provider[] {
    if (options.useFactory) {
      return [
        {
          provide: PactModuleProviders.ConsumerOptions,
          useFactory: async () => {
            const { consumer } = await options.useFactory();
            return consumer;
          },
          inject: options.inject || [],
        },
      ];
    }

    const inject = [(options.useClass || options.useExisting) as Type<PactConsumerOverallOptions>];

    return [
      {
        provide: PactModuleProviders.ConsumerOptions,
        useFactory: async (optionsFactory: PactConsumerOptionsFactory) => {
          const { consumer } = await optionsFactory.createPactConsumerOptions();

          return consumer;
        },
        inject,
      },
    ];
  }
}

@Module({})
export class PactV2ConsumerCoreModule {
  public static register(options: PactV2ConsumerOverallOptions): DynamicModule {
    const consumerOptProvider = ProviderFactory.create(PactModuleProviders.ConsumerOptions, options.consumer);

    return {
      module: PactV2ConsumerCoreModule,
      exports: [PactV2Factory],
      providers: [consumerOptProvider, PactV2Provider, PactV2Factory],
    };
  }

  public static registerAsync(options: PactV2ConsumerModuleAsyncOptions): DynamicModule {
    return {
      module: PactV2ConsumerCoreModule,
      exports: [PactV2Factory],
      imports: options.imports,
      providers: [...this.createAsyncProviders(options), PactV2Provider, PactV2Factory],
    };
  }

  private static createAsyncProviders(options: PactV2ConsumerModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return this.createAsyncOptionsProviders(options);
    }

    const { useClass } = options;

    return [
      ...this.createAsyncOptionsProviders(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProviders(options: PactV2ConsumerModuleAsyncOptions): Provider[] {
    if (options.useFactory) {
      return [
        {
          provide: PactModuleProviders.ConsumerOptions,
          useFactory: async () => {
            const { consumer } = await options.useFactory();
            return consumer;
          },
          inject: options.inject || [],
        },
      ];
    }

    const inject = [(options.useClass || options.useExisting) as Type<PactV2ConsumerOverallOptions>];

    return [
      {
        provide: PactModuleProviders.ConsumerOptions,
        useFactory: async (optionsFactory: PactV2ConsumerOptionsFactory) => {
          const { consumer } = await optionsFactory.createPactV2ConsumerOptions();

          return consumer;
        },
        inject,
      },
    ];
  }
}

@Module({})
export class PactV3ConsumerCoreModule {
  public static register(options: PactV3ConsumerOverallOptions): DynamicModule {
    const consumerOptProvider = ProviderFactory.create(PactModuleProviders.ConsumerOptions, options.consumer);

    return {
      module: PactV3ConsumerCoreModule,
      exports: [PactV3Factory],
      providers: [consumerOptProvider, PactV3Provider, PactV3Factory],
    };
  }

  public static registerAsync(options: PactV3ConsumerModuleAsyncOptions): DynamicModule {
    return {
      module: PactV3ConsumerCoreModule,
      exports: [PactV3Factory],
      imports: options.imports,
      providers: [...this.createAsyncProviders(options), PactV3Provider, PactV3Factory],
    };
  }

  private static createAsyncProviders(options: PactV3ConsumerModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return this.createAsyncOptionsProviders(options);
    }

    const { useClass } = options;

    return [
      ...this.createAsyncOptionsProviders(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProviders(options: PactV3ConsumerModuleAsyncOptions): Provider[] {
    if (options.useFactory) {
      return [
        {
          provide: PactModuleProviders.ConsumerOptions,
          useFactory: async () => {
            const { consumer } = await options.useFactory();
            return consumer;
          },
          inject: options.inject || [],
        },
      ];
    }

    const inject = [(options.useClass || options.useExisting) as Type<PactV3ConsumerOverallOptions>];

    return [
      {
        provide: PactModuleProviders.ConsumerOptions,
        useFactory: async (optionsFactory: PactV3ConsumerOptionsFactory) => {
          const { consumer } = await optionsFactory.createPactV3ConsumerOptions();

          return consumer;
        },
        inject,
      },
    ];
  }
}
