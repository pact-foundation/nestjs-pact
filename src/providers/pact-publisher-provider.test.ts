import { Test } from '@nestjs/testing';
import { Publisher } from '@pact-foundation/pact';
import { PactModuleProviders } from '../common/pact-module-providers.enum';
import { PactPublisherProvider } from '../providers/pact-publisher.provider';

jest.mock('@pact-foundation/pact');

(Publisher as jest.Mock<Publisher>).mockImplementation(() => (({ Publisher: jest.fn() } as unknown) as Publisher));

describe('PactPublisherProvider', () => {
  const publicationOptions = { pactBroker: 'example-broker', consumerVersion: '1' };

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
