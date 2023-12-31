import { Test, TestingModule } from '@nestjs/testing';

import { PactV3 as Pact } from '@pact-foundation/pact';

import { PactConsumerOptions } from '../interfaces/pact-consumer-module-options.interface';
import { PactModuleProviders } from '../common/pact-module-providers.enum';

import { PactFactory } from './pact-factory.service';

jest.mock('@pact-foundation/pact');

describe('PactFactory', () => {
  let moduleRef: TestingModule;
  let pactFactoryService: PactFactory;

  const contractBetween = {
    provider: 'Provider 1',
    consumer: 'Consumer 1',
  };

  const consumerOptions = {
    host: 'http://some-host',
    port: 1234,
  } as PactConsumerOptions;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      providers: [PactFactory, { provide: PactModuleProviders.ConsumerOptions, useValue: consumerOptions }],
    }).compile();

    pactFactoryService = moduleRef.get<PactFactory>(PactFactory);
  });

  describe('Given a PactFactory service', () => {
    describe("When calling 'createContractBetween' method", () => {
      let pact: Pact;

      beforeAll(() => {
        pact = pactFactoryService.createContractBetween(contractBetween);
      });

      test('then call Pact constructor', () => {
        expect(Pact).toHaveBeenCalledTimes(1);
      });

      test("then call Pact constructor with the 'provider', 'consumer' and the rest of the options", () => {
        expect(Pact).toHaveBeenCalledWith({
          ...consumerOptions,
          ...contractBetween,
        });
      });

      test('then return an instance of Pact', () => {
        expect(pact).toBeInstanceOf(Pact);
      });
    });
  });
});
