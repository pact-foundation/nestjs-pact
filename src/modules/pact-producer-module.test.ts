import { Test } from '@nestjs/testing';
import { PactProducerModule } from './pact-producer.module';
import { PactProducerOptions, PactProducerOptionsFactory } from '../interfaces/pact-producer-module-options.interface';
import { PactVerifierService } from '../services/pact-verifier.service';

describe("Given a 'PactProducerModule' module", () => {
  const config = {};

  class PactProducerConfigTestService implements PactProducerOptionsFactory {
    createPactProducerOptions(): PactProducerOptions {
      return config;
    }
  }

  describe("when calling the 'register' method", () => {
    test('then provide Pact Verifier service', async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [PactProducerModule.register(config)],
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
            PactProducerModule.registerAsync({
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
            PactProducerModule.registerAsync({
              useClass: PactProducerConfigTestService,
            }),
          ],
        }).compile();

        const pactVerifierService = moduleRef.get(PactVerifierService);
        expect(pactVerifierService).toBeDefined();
      });
    });
  });
});
