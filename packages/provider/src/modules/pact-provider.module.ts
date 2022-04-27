import { DynamicModule, Module } from '@nestjs/common';
import { PactProviderCoreModule } from './pact-provider-core.module';
import {
  PactProviderModuleAsyncOptions,
  PactProviderOptions,
} from '../interfaces/pact-provider-module-options.interface';

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
