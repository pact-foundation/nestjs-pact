import { INestApplication, Inject, Injectable } from '@nestjs/common';
import { Verifier } from '@pact-foundation/pact';
import { PactModuleProviders } from '../common/pact-module-providers.enum';
import { PactProviderOptions } from '../interfaces/pact-provider-module-options.interface';

@Injectable()
export class PactVerifierService {
  public constructor(
    @Inject(PactModuleProviders.ProviderOptions) private readonly options: PactProviderOptions,
    @Inject(PactModuleProviders.PactVerifier) private readonly verifier: Verifier
  ) {}

  public async verify(app: INestApplication): Promise<any> {
    const providerUrl = new URL(this.options.providerBaseUrl);

    await app.listen(providerUrl.port || 80, providerUrl.hostname);

    // this can throw an error, we are sure the app will close after calling finally
    return this.verifier.verifyProvider().finally(() => app.close());
  }

  public getVerifier(): Verifier {
    return this.verifier;
  }
}
