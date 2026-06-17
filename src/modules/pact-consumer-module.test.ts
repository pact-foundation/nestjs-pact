import { Test, TestingModule } from '@nestjs/testing';

import {
  PactConsumerOptionsFactory,
  PactConsumerOverallOptions,
} from '../interfaces/pact-consumer-module-options.interface';
import { PactFactory } from '../services/pact-factory.service';

import { PactConsumerModule } from './pact-consumer.module';

describe("Given a 'PactConsumerModule' module", () => {
  const config: PactConsumerOverallOptions = {
    consumer: {
      host: 'http://beverly-hills.com',
      port: 90210,
    },
  };

  class PactConsumerConfigTestService implements PactConsumerOptionsFactory {
    createPactConsumerOptions(): PactConsumerOverallOptions {
      return config;
    }
  }

  describe("when calling the 'register' method", () => {
    let moduleRef: TestingModule;

    beforeAll(async () => {
      moduleRef = await Test.createTestingModule({
        imports: [PactConsumerModule.register(config)],
      }).compile();
    });

    test('then provide PactFactory service', async () => {
      const pactFactory = moduleRef.get(PactFactory);
      expect(pactFactory).toBeDefined();
    });
  });

  describe("when calling the 'registerAsync' method", () => {
    let moduleRef: TestingModule;

    beforeAll(async () => {
      moduleRef = await Test.createTestingModule({
        imports: [
          PactConsumerModule.registerAsync({
            useFactory: () => config,
          }),
        ],
      }).compile();
    });

    describe("and the 'useFactory' option is used", () => {
      test('then provide PactFactory service', async () => {
        const pactFactory = moduleRef.get(PactFactory);
        expect(pactFactory).toBeDefined();
      });
    });

    describe("and the 'useClass' option is used", () => {
      let moduleRef: TestingModule;

      beforeAll(async () => {
        moduleRef = await Test.createTestingModule({
          imports: [
            PactConsumerModule.registerAsync({
              useClass: PactConsumerConfigTestService,
            }),
          ],
        }).compile();
      });

      test('then provide PactFactory service', async () => {
        const pactFactory = moduleRef.get(PactFactory);
        expect(pactFactory).toBeDefined();
      });
    });
  });
});
