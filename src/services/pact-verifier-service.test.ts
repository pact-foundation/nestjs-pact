import { Test, TestingModule } from '@nestjs/testing';
import { PactModuleProviders } from '../common/pact-module-providers.enum';
import { PactVerifierService } from './pact-verifier.service';
import { INestApplication } from '@nestjs/common';
import { Verifier } from '@pact-foundation/pact';
import { PactProviderOptions } from '../interfaces/pact-provider-module-options.interface';

jest.mock('get-port', () => () => 80);

describe('PactVerifierService', () => {
  let moduleRef: TestingModule;
  let pactVerifierService: PactVerifierService;

  const appMock = jest.createMockFromModule<INestApplication>('');
  const pactVerifierMock = jest.createMockFromModule<Verifier>('');

  let options: PactProviderOptions = { providerBaseUrl: 'http://127.0.0.1:80' };

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
    jest.resetAllMocks();

    pactVerifierMock.verifyProvider = jest.fn().mockReturnValue(Promise.resolve('some-result'));

    appMock.getUrl = jest.fn().mockResolvedValueOnce('http://127.0.0.1:80');
    appMock.listen = jest.fn().mockResolvedValueOnce(true);
    appMock.close = jest.fn().mockResolvedValueOnce(true);
  });

  describe('when configuring the providerBaseHost', () => {
    beforeEach(async () => {
      options = { ...options, providerBaseUrl: 'http://127.0.0.1:80' };
      await pactVerifierService.verify(appMock);
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
