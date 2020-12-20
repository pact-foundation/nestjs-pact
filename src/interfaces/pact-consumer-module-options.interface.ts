import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { PactOptions } from '@pact-foundation/pact';
import { PublisherOptions } from '@pact-foundation/pact-node';

export type PactConsumerOptions = Omit<PactOptions, 'consumer' | 'provider'>;
export type PactPublicationOptions = PublisherOptions;

export interface PactConsumerOverallOptions {
  consumer: PactConsumerOptions;
  publication?: PactPublicationOptions;
}

export interface PactConsumerOptionsFactory {
  createPactConsumerOptions(): Promise<PactConsumerOverallOptions> | PactConsumerOverallOptions;
}

export interface PactConsumerModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<PactConsumerOptionsFactory>;
  useExisting?: Type<PactConsumerOverallOptions>;
  useFactory?: (...args: any[]) => Promise<PactConsumerOverallOptions> | PactConsumerOverallOptions;
}
