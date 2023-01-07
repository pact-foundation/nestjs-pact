import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

import { PactOptions, PactV3Options } from '@pact-foundation/pact';
import { PublisherOptions } from '@pact-foundation/pact-core';

export type PactConsumerOptions = Omit<PactOptions, 'consumer' | 'provider'>;
export type PactV3ConsumerOptions = Omit<PactV3Options, 'consumer' | 'provider'>;
export type PactPublicationOptions = PublisherOptions;

export interface PactConsumerOverallOptions {
  consumer: PactConsumerOptions;
  publication?: PactPublicationOptions;
}
export interface PactV3ConsumerOverallOptions {
  consumer: PactV3ConsumerOptions;
  publication?: PactPublicationOptions;
}

export interface PactConsumerOptionsFactory {
  createPactConsumerOptions(): Promise<PactConsumerOverallOptions> | PactConsumerOverallOptions;
}
export interface PactV3ConsumerOptionsFactory {
  createPactConsumerOptions(): Promise<PactV3ConsumerOverallOptions> | PactV3ConsumerOverallOptions;
}

export interface PactConsumerModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<PactConsumerOptionsFactory>;
  useExisting?: Type<PactConsumerOverallOptions>;
  useFactory?: (...args: any[]) => Promise<PactConsumerOverallOptions> | PactConsumerOverallOptions;
}
export interface PactV3ConsumerModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<PactV3ConsumerOptionsFactory>;
  useExisting?: Type<PactV3ConsumerOverallOptions>;
  useFactory?: (...args: any[]) => Promise<PactV3ConsumerOverallOptions> | PactV3ConsumerOverallOptions;
}
