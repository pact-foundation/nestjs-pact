import { Test } from '@nestjs/testing';
import { Verifier } from '@pact-foundation/pact-core';
import { PactModuleProviders } from '../common/pact-module-providers.enum';
import { PactVerifierProvider } from './pact-verifier.provider';
import { PactProviderOptions } from '../interfaces/pact-provider-module-options.interface';

const mockVerifier = jest.createMockFromModule<Verifier>('@pact-foundation/pact-core');

mockVerifier.verify = jest.fn();

describe('PactVerifierProvider', () => {
  const providerOptions: PactProviderOptions = { providerBaseUrl: 'http://127.0.0.1:80' };

  beforeAll(async () => {
    await Test.createTestingModule({
      providers: [
        PactVerifierProvider,
        {
          provide: PactModuleProviders.ProviderOptions,
          useValue: providerOptions,
        },
      ],
    }).compile();
  });

  describe('When calling the provider (in any module)', () => {
    test('then call Verifier with the exact options', () => {
      expect(Verifier).toHaveBeenCalledWith(providerOptions);
    });
  });
});
