import { Inject, Injectable } from '@nestjs/common';

import { Pact, PactV2, PactV3 } from '@pact-foundation/pact';

import { ContractBetween } from '../interfaces/contract-between.interface';
import {
  PactConsumerOptions,
  PactV2ConsumerOptions,
  PactV3ConsumerOptions,
} from '../interfaces/pact-consumer-module-options.interface';
import { PactModuleProviders } from '../common/pact-module-providers.enum';

@Injectable()
export class PactFactory {
  public constructor(@Inject(PactModuleProviders.ConsumerOptions) private readonly options: PactConsumerOptions) {}

  public createContractBetween(sides: ContractBetween): Pact {
    const { provider, consumer } = sides;

    return new Pact({
      consumer,
      provider,
      ...this.options,
    });
  }
}

@Injectable()
export class PactV2Factory {
  public constructor(@Inject(PactModuleProviders.ConsumerOptions) private readonly options: PactV2ConsumerOptions) {}
  public createContractBetween(sides: ContractBetween): PactV2 {
    const { provider, consumer } = sides;

    return new PactV2({
      consumer,
      provider,
      ...this.options,
    });
  }
}

@Injectable()
export class PactV3Factory {
  public constructor(@Inject(PactModuleProviders.ConsumerOptions) private readonly options: PactV3ConsumerOptions) {}

  public createContractBetween(sides: ContractBetween): PactV3 {
    const { provider, consumer } = sides;

    return new PactV3({
      consumer,
      provider,
      ...this.options,
    });
  }
}
