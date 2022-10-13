import { Provider } from '@nestjs/common';
import { Verifier } from '@pact-foundation/pact';
import { PactModuleProviders } from '../common/pact-module-providers.enum';
import { PactProviderOptions } from '../interfaces/pact-provider-module-options.interface';

export const PactVerifierProvider: Provider<Verifier> = {
  provide: PactModuleProviders.PactVerifier,
  useFactory: (config: PactProviderOptions) => new Verifier(config),
  inject: [PactModuleProviders.ProviderOptions],
};
