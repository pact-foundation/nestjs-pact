import { Inject, Injectable } from '@nestjs/common';
import { Pact } from '@pact-foundation/pact';
import { ContractBetween } from '../interfaces/contract-between.interface';
import { PactConsumerOptions } from '../interfaces/pact-consumer-module-options.interface';
import { PactModuleProviders } from '../interfaces/pact-module-providers.enum';

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
