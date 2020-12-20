import { Test, TestingModule } from '@nestjs/testing';
import { PactModuleProviders } from '../common/pact-module-providers.enum';
import { PactVerifierService } from '../services/pact-verifier.service';

describe('PactVerifierService', () => {
  let moduleRef: TestingModule;
  let pactVerifierProvider;
  let pactVerifierService: PactVerifierService;

  class VerifierMock {
    verifyProvider = jest.fn();
  }

  const appMock = {
    getUrl: jest.fn().mockResolvedValueOnce('127.0.0.1:80'),
    listen: jest.fn().mockResolvedValueOnce(true),
    close: jest.fn().mockResolvedValueOnce(true),
  };

  const options = { some: true, keys: true, to: true, check: true };

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      providers: [
        PactVerifierService,
        {
          provide: PactModuleProviders.PactVerifier,
          useClass: VerifierMock,
        },
        {
          provide: PactModuleProviders.ProducerOptions,
          useValue: options,
        },
      ],
    }).compile();

    pactVerifierService = moduleRef.get<PactVerifierService>(PactVerifierService);
    pactVerifierProvider = moduleRef.get(PactModuleProviders.PactVerifier);
  });

  describe("When calling the 'verify' method", () => {
    beforeAll(async () => {
      await pactVerifierService.verify(appMock as any);
    });

    test("then call 'verifyProvider' with the exact options", async () => {
      expect(pactVerifierProvider.verifyProvider).toHaveBeenCalledWith({
        ...options,
        providerBaseUrl: '127.0.0.1:80',
      });
    });

    test('then call the application methods', () => {
      expect(appMock.close).toHaveBeenCalled();
      expect(appMock.listen).toHaveBeenCalled();
    });
  });

  describe("When calling the 'getVerifier' method", () => {
    test('then return something', () => {
      expect(pactVerifierService.getVerifier()).toBeInstanceOf(VerifierMock);
    });
  });
});
