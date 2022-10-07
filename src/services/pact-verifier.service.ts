import { INestApplication, Inject, Injectable } from '@nestjs/common';
import { Verifier } from '@pact-foundation/pact';
import { PactModuleProviders } from '../common/pact-module-providers.enum';
import { PactProviderOptions } from '../interfaces/pact-provider-module-options.interface';

@Injectable()
export class PactVerifierService {
  private verifier: Verifier | undefined = undefined;

  public constructor(@Inject(PactModuleProviders.ProviderOptions) private readonly options: PactProviderOptions) {}

  public async verify(app: INestApplication): Promise<any> {
    const host = this.options.providerHost || 'localhost';
    const port = this.options.providerPort || 9123;

    await app.listen(port, host);

    const appUrl = await app.getUrl();

    this.verifier = new Verifier({
      providerBaseUrl: appUrl,
      ...this.options,
    });

    const results = await this.verifier.verifyProvider();

    await app.close();

    return results;
  }

  public getVerifier() {
    return this.verifier;
  }
}
