import { Test, TestingModule } from '@nestjs/testing';
import { PactModuleProviders } from '../common/pact-module-providers.enum';
import { PactVerifierService } from './pact-verifier.service';
import { INestApplication } from '@nestjs/common';

jest.mock('get-port', () => () => 80);

describe('PactVerifierService', () => {
  let moduleRef: TestingModule;
  let pactVerifierService: PactVerifierService;

  const appMock = jest.createMockFromModule<INestApplication>('');

  let options = { some: true, keys: true, to: true, check: true, providerHost: '0.0.0.0' } as any;

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
    jest.resetAllMocks();

    appMock.getUrl = jest.fn().mockResolvedValueOnce('http://127.0.0.1:80');
    appMock.listen = jest.fn().mockResolvedValueOnce(true);
    appMock.close = jest.fn().mockResolvedValueOnce(true);
  });

  describe('when configuring the providerBaseHost', () => {
    beforeEach(async () => {
      options = { ...options, providerHost: '0.0.0.0' };
      await pactVerifierService.verify(appMock);
    });
    test('allows configuring hosts', async () => {
      expect(appMock.listen).toHaveBeenCalledWith(80, '0.0.0.0');
    });
    test('then call the application methods', () => {
      expect(appMock.close).toHaveBeenCalled();
      expect(appMock.listen).toHaveBeenCalled();
    });
  });
});
