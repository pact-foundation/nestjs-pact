import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

import { VerifierOptions } from '@pact-foundation/pact';

export interface PactProviderOptionsFactory {
  createPactProviderOptions(): Promise<VerifierOptions> | VerifierOptions;
}

export interface PactProviderModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<PactProviderOptionsFactory>;
  useExisting?: Type<PactProviderOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<VerifierOptions> | VerifierOptions;
}
