import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

import { PactOptions, PactV2Options, PactV3Options } from '@pact-foundation/pact';
import { PublisherOptions } from '@pact-foundation/pact-cli';

export type PactConsumerOptions = Omit<PactOptions, 'consumer' | 'provider'>;
export type PactV2ConsumerOptions = Omit<PactV2Options, 'consumer' | 'provider'>;
export type PactV3ConsumerOptions = Omit<PactV3Options, 'consumer' | 'provider'>;
export type PactPublicationOptions = PublisherOptions;

export interface PactConsumerOverallOptions {
  consumer: PactConsumerOptions;
  publication?: PactPublicationOptions;
}

export interface PactV2ConsumerOverallOptions {
  consumer: PactV2ConsumerOptions;
  publication?: PactPublicationOptions;
}

export interface PactV3ConsumerOverallOptions {
  consumer: PactV3ConsumerOptions;
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

export interface PactV2ConsumerOptionsFactory {
  createPactV2ConsumerOptions(): Promise<PactV2ConsumerOverallOptions> | PactV2ConsumerOverallOptions;
}

export interface PactV2ConsumerModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<PactV2ConsumerOptionsFactory>;
  useExisting?: Type<PactV2ConsumerOverallOptions>;
  useFactory?: (...args: any[]) => Promise<PactV2ConsumerOverallOptions> | PactV2ConsumerOverallOptions;
}

export interface PactV3ConsumerOptionsFactory {
  createPactV3ConsumerOptions(): Promise<PactV3ConsumerOverallOptions> | PactV3ConsumerOverallOptions;
}

export interface PactV3ConsumerModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<PactV3ConsumerOptionsFactory>;
  useExisting?: Type<PactV3ConsumerOverallOptions>;
  useFactory?: (...args: any[]) => Promise<PactV3ConsumerOverallOptions> | PactV3ConsumerOverallOptions;
}
