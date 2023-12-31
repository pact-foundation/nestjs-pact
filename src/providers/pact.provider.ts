import { Type } from '@nestjs/common';

import { PactV3 as Pact } from '@pact-foundation/pact';

import { ProviderFactory } from '../common/provider-factory';
import { PactModuleProviders } from '../common/pact-module-providers.enum';

export const PactProvider = ProviderFactory.create<Type<Pact>>(PactModuleProviders.Pact, Pact);
