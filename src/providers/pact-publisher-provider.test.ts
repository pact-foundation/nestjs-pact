import { Test } from '@nestjs/testing';

import { Publisher } from '@pact-foundation/pact-core';

import { PactModuleProviders } from '../common/pact-module-providers.enum';
import { PactPublicationOptions } from '../interfaces/pact-consumer-module-options.interface';

import { PactPublisherProvider } from './pact-publisher.provider';

jest.mock('@pact-foundation/pact-core', () => ({
  Publisher: jest.fn().mockImplementation(() => {
    publish: jest.fn();
  }),
}));

describe('PactPublisherProvider', () => {
  const publicationOptions: PactPublicationOptions = {
    pactBroker: 'example-broker',
    pactFilesOrDirs: ['./'],
    consumerVersion: '1',
  };

  beforeAll(async () => {
    await Test.createTestingModule({
      providers: [
        PactPublisherProvider,
        {
          provide: PactModuleProviders.PublicationOptions,
          useValue: publicationOptions,
        },
      ],
    }).compile();
  });

  describe('When calling the provider (in any module)', () => {
    test('then call Publisher with the exact options', () => {
      expect(Publisher).toHaveBeenCalledWith(publicationOptions);
    });
  });
});
