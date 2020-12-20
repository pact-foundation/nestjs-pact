import { Pact } from '@pact-foundation/pact';
import { Type } from '@nestjs/common';
import { ProviderFactory } from '../common/provider-factory';
import { PactModuleProviders } from '../common/pact-module-providers.enum';

export const PactProvider = ProviderFactory.create<Type<Pact>>(PactModuleProviders.Pact, Pact);
