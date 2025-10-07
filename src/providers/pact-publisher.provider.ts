import { FactoryProvider } from '@nestjs/common';
import * as fs from 'fs';

import { Publisher } from '@pact-foundation/pact-cli';

import { PactPublicationOptions } from '../interfaces/pact-consumer-module-options.interface';
import { PactModuleProviders } from '../common/pact-module-providers.enum';

export const PactPublisherProvider: FactoryProvider<Publisher> = {
  provide: PactModuleProviders.PactPublisher,
  useFactory: (options: PactPublicationOptions) => {
    if (!options || !options.pactFilesOrDirs || options.pactFilesOrDirs.length === 0) {
      return;
    }
    if (!fs.existsSync(options.pactFilesOrDirs[0])) {
      fs.mkdirSync(options.pactFilesOrDirs[0], { recursive: true });
    }
    return new Publisher(options);
  },
  inject: [PactModuleProviders.PublicationOptions],
};
