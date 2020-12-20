import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { VerifierOptions } from '@pact-foundation/pact';

export type PactProducerOptions = Omit<VerifierOptions, 'providerBaseUrl'>;

export interface PactProducerOptionsFactory {
  createPactProducerOptions(): Promise<PactProducerOptions> | PactProducerOptions;
}

export interface PactProducerModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<PactProducerOptionsFactory>;
  useExisting?: Type<PactProducerOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<PactProducerOptions> | PactProducerOptions;
}
