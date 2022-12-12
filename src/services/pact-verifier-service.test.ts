import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { VerifierOptions } from '@pact-foundation/pact';

import { PactModuleProviders } from '../common/pact-module-providers.enum';

import { PactVerifierService } from './pact-verifier.service';

jest.mock('get-port', () => () => 80);

describe('PactVerifierService', () => {
  let moduleRef: TestingModule;
  let pactVerifierService: PactVerifierService;

  const appMock = {
    getUrl: jest.fn().mockResolvedValueOnce('http://127.0.0.1:80'),
    listen: jest.fn().mockResolvedValueOnce(true),
    close: jest.fn().mockResolvedValueOnce(true),
  };

  const pactVerifierMock = {
    verifyProvider: jest.fn().mockReturnValue(Promise.resolve('some-result')),
  };

  let options: VerifierOptions = { providerBaseUrl: 'http://127.0.0.1:80' };

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      providers: [
        PactVerifierService,
        {
          provide: PactModuleProviders.PactVerifier,
          useValue: pactVerifierMock,
        },
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

  describe('when configuring the providerBaseHost', () => {
    beforeEach(async () => {
      options = { ...options, providerBaseUrl: 'http://127.0.0.1:80' };
      await pactVerifierService.verify(appMock as unknown as INestApplication);
    });
    test('allows configuring hosts', async () => {
      expect(appMock.listen).toHaveBeenCalledWith(80, '127.0.0.1');
    });
    test('then call the application methods', () => {
      expect(appMock.close).toHaveBeenCalled();
      expect(appMock.listen).toHaveBeenCalled();
    });
  });
});
