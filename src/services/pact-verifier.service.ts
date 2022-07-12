import getPort from 'get-port';
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
    const host = this.options.providerHost || 'localhost';
    await app.listen(await getPort(), host);

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
