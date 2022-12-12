import { Provider } from '@nestjs/common';

import { Verifier, VerifierOptions } from '@pact-foundation/pact';

import { PactModuleProviders } from '../common/pact-module-providers.enum';

export const PactVerifierProvider: Provider<Verifier> = {
  provide: PactModuleProviders.PactVerifier,
  useFactory: (config: VerifierOptions) => new Verifier(config),
  inject: [PactModuleProviders.ProviderOptions],
};
