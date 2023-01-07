import { Type } from '@nestjs/common';

import { Pact, PactV3 } from '@pact-foundation/pact';

import { ProviderFactory } from '../common/provider-factory';
import { PactModuleProviders } from '../common/pact-module-providers.enum';

export const PactProvider = ProviderFactory.create<Type<Pact>>(PactModuleProviders.Pact, Pact);
export const PactV3Provider = ProviderFactory.create<Type<PactV3>>(PactModuleProviders.PactV3, PactV3);
