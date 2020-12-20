import getPort from 'get-port';
import { INestApplication, Inject, Injectable } from '@nestjs/common';
import { Verifier } from '@pact-foundation/pact';
import { PactModuleProviders } from '../common/pact-module-providers.enum';
import { PactProducerOptions } from '../interfaces/pact-producer-module-options.interface';

@Injectable()
export class PactVerifierService {
  public constructor(
    @Inject(PactModuleProviders.ProducerOptions) private readonly options: PactProducerOptions,
    @Inject(PactModuleProviders.PactVerifier) private readonly verifier: Verifier
  ) {}

  public async verify(app: INestApplication): Promise<any> {
    await app.listen(await getPort());

    const appUrl = await app.getUrl();

    const results = await this.verifier.verifyProvider({
      ...this.options,
      providerBaseUrl: appUrl,
    });

    await app.close();

    return results;
  }

  public getVerifier(): Verifier {
    return this.verifier;
  }
}
