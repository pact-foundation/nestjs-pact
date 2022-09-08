import { FactoryProvider } from '@nestjs/common';
import { PactPublicationOptions } from '../interfaces/pact-consumer-module-options.interface';
import { PactModuleProviders } from '../common/pact-module-providers.enum';
import { Publisher } from '@pact-foundation/pact-core';

export const PactPublisherProvider: FactoryProvider<Publisher> = {
  provide: PactModuleProviders.PactPublisher,
  useFactory: (options: PactPublicationOptions) => new Publisher(options),
  inject: [PactModuleProviders.PublicationOptions],
};
