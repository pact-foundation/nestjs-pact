import { Provider } from '@nestjs/common';
import { Verifier } from '@pact-foundation/pact';
import { PactModuleProviders } from '../interfaces/pact-module-providers.enum';

export const PactVerifierProvider: Provider<Verifier> = {
  provide: PactModuleProviders.PactVerifier,
  useFactory: () => new Verifier(),
};
