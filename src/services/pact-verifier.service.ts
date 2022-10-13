import { INestApplication, Inject, Injectable } from '@nestjs/common';
import { Verifier } from '@pact-foundation/pact';
import { PactModuleProviders } from '../common/pact-module-providers.enum';
import { PactProviderOptions } from '../interfaces/pact-provider-module-options.interface';

@Injectable()
export class PactVerifierService {
  public constructor(
    @Inject(PactModuleProviders.PactVerifier) private readonly verifier: Verifier,
    @Inject(PactModuleProviders.ProviderOptions) private readonly options: PactProviderOptions
  ) {}

  public async verify(app: INestApplication): Promise<any> {
    const providerUrl = new URL(this.options.providerBaseUrl);
    let results: string;

    await app.listen(providerUrl.port || 80, providerUrl.hostname);

    try {
      results = await this.verifier.verifyProvider();
    } catch (e) {
      // do nothing
    } finally {
      await app.close();
    }

    return results;
  }

  public getVerifier() {
    return this.verifier;
  }
}
