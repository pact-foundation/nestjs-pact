import { Test, TestingModule } from '@nestjs/testing';

import { Pact, PactV2, PactV3 } from '@pact-foundation/pact';

import {
  PactConsumerOptions,
  PactV2ConsumerOptions,
  PactV3ConsumerOptions,
} from '../interfaces/pact-consumer-module-options.interface';
import { PactModuleProviders } from '../common/pact-module-providers.enum';

import { PactFactory, PactV2Factory, PactV3Factory } from './pact-factory.service';

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

describe('PactV2Factory', () => {
  let moduleRef: TestingModule;
  let pactFactoryService: PactV2Factory;

  const contractBetween = {
    provider: 'Provider 1',
    consumer: 'Consumer 1',
  };

  const consumerOptions = {
    host: 'http://some-host',
    port: 1234,
  } as PactV2ConsumerOptions;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      providers: [PactV2Factory, { provide: PactModuleProviders.ConsumerOptions, useValue: consumerOptions }],
    }).compile();

    pactFactoryService = moduleRef.get<PactV2Factory>(PactV2Factory);
  });

  describe('Given a PactFactory service', () => {
    describe("When calling 'createContractBetween' method", () => {
      let pact: PactV2;

      beforeAll(() => {
        pact = pactFactoryService.createContractBetween(contractBetween);
      });

      test('then call Pact constructor', () => {
        expect(PactV2).toHaveBeenCalledTimes(1);
      });

      test("then call Pact constructor with the 'provider', 'consumer' and the rest of the options", () => {
        expect(PactV2).toHaveBeenCalledWith({
          ...consumerOptions,
          ...contractBetween,
        });
      });

      test('then return an instance of PactV2', () => {
        expect(pact).toBeInstanceOf(PactV2);
      });
    });
  });
});

describe('PactV3Factory', () => {
  let moduleRef: TestingModule;
  let pactV3FactoryService: PactV3Factory;

  const contractBetween = {
    provider: 'Provider 1',
    consumer: 'Consumer 1',
  };

  const consumerOptions = {
    host: 'http://some-host',
    port: 1234,
  } as PactV3ConsumerOptions;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      providers: [PactV3Factory, { provide: PactModuleProviders.ConsumerOptions, useValue: consumerOptions }],
    }).compile();

    pactV3FactoryService = moduleRef.get<PactV3Factory>(PactV3Factory);
  });

  describe('Given a PactV3Factory service', () => {
    describe("When calling 'createContractBetween' method", () => {
      let pact: PactV3;

      beforeAll(() => {
        pact = pactV3FactoryService.createContractBetween(contractBetween);
      });

      test('then call Pact constructor', () => {
        expect(PactV3).toHaveBeenCalledTimes(1);
      });

      test("then call Pact constructor with the 'provider', 'consumer' and the rest of the options", () => {
        expect(PactV3).toHaveBeenCalledWith({
          ...consumerOptions,
          ...contractBetween,
        });
      });

      test('then return an instance of Pact', () => {
        expect(pact).toBeInstanceOf(PactV3);
      });
    });
  });
});
