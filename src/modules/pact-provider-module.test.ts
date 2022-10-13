import { Test } from '@nestjs/testing';
import { PactProviderModule } from './pact-provider.module';
import { PactProviderOptions, PactProviderOptionsFactory } from '../interfaces/pact-provider-module-options.interface';
import { PactVerifierService } from '../services/pact-verifier.service';

describe("Given a 'PactProviderModule' module", () => {
  const config: PactProviderOptions = {
    providerBaseUrl: 'http://127.0.0.1:80',
  };

  class PactProviderConfigTestService implements PactProviderOptionsFactory {
    createPactProviderOptions(): PactProviderOptions {
      return config;
    }
  }

  describe("when calling the 'register' method", () => {
    test('then provide Pact Verifier service', async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [PactProviderModule.register(config)],
      }).compile();

      const pactVerifierService = moduleRef.get(PactVerifierService);
      expect(pactVerifierService).toBeDefined();
    });
  });

  describe("when calling the 'registerAsync' method", () => {
    describe("and the 'useFactory' option is used", () => {
      test('then provide Pact Verifier service', async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [
            PactProviderModule.registerAsync({
              useFactory: () => config,
            }),
          ],
        }).compile();

        const pactVerifierService = moduleRef.get(PactVerifierService);
        expect(pactVerifierService).toBeDefined();
      });
    });

    describe("and the 'useClass' option is used", () => {
      test('then provide Pact Verifier service', async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [
            PactProviderModule.registerAsync({
              useClass: PactProviderConfigTestService,
            }),
          ],
        }).compile();

        const pactVerifierService = moduleRef.get(PactVerifierService);
        expect(pactVerifierService).toBeDefined();
      });
    });
  });
});
