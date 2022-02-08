import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { VerifierOptions } from '@pact-foundation/pact';

export type PactProviderOptions = Omit<VerifierOptions, 'providerBaseUrl'> & { providerHost?: string };

export interface PactProviderOptionsFactory {
  createPactProviderOptions(): Promise<PactProviderOptions> | PactProviderOptions;
}

export interface PactProviderModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<PactProviderOptionsFactory>;
  useExisting?: Type<PactProviderOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<PactProviderOptions> | PactProviderOptions;
}
