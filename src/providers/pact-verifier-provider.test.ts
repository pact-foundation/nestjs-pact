import { Test } from '@nestjs/testing';

import { Verifier, VerifierOptions } from '@pact-foundation/pact';

import { PactModuleProviders } from '../common/pact-module-providers.enum';

import { PactVerifierProvider } from './pact-verifier.provider';

jest.mock('@pact-foundation/pact', () => ({
  Verifier: jest.fn().mockImplementation(() => {
    verify: jest.fn();
  }),
}));

describe('PactVerifierProvider', () => {
  const providerOptions: VerifierOptions = { providerBaseUrl: 'http://127.0.0.1:80' };

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
