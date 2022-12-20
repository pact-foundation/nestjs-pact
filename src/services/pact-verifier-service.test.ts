import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { PactProviderOptions } from '../interfaces/pact-provider-module-options.interface';
import { PactModuleProviders } from '../common/pact-module-providers.enum';

import { PactVerifierService } from './pact-verifier.service';

jest.mock('get-port', () => () => Promise.resolve(1234));

describe('PactVerifierService', () => {
  let moduleRef: TestingModule;
  let pactVerifierService: PactVerifierService;

  const appMock = {
    getUrl: jest.fn().mockResolvedValue('http://127.0.0.1:8080'),
    listen: jest.fn().mockResolvedValueOnce(true),
    close: jest.fn().mockResolvedValueOnce(true),
  };

  const options: PactProviderOptions = { providerHost: 'http://127.0.0.1:8080' };

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      providers: [
        PactVerifierService,
        {
          provide: PactModuleProviders.ProviderOptions,
          useValue: options,
        },
      ],
    }).compile();

    pactVerifierService = moduleRef.get<PactVerifierService>(PactVerifierService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when configuring the providerHost', () => {
    beforeEach(async () => {
      await pactVerifierService.verify(appMock as unknown as INestApplication);
    });
    test('allows configuring hosts', async () => {
      expect(appMock.listen).toHaveBeenCalledWith('8080', '127.0.0.1');
    });

    test('then call the application methods', () => {
      expect(appMock.close).toHaveBeenCalled();
      expect(appMock.listen).toHaveBeenCalled();
    });
  });
});
