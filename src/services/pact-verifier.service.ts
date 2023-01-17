import { INestApplication, Inject, Injectable } from '@nestjs/common';
import getPort from 'get-port';

import { Verifier } from '@pact-foundation/pact';

import { PactProviderOptions } from '../interfaces/pact-provider-module-options.interface';
import { PactModuleProviders } from '../common/pact-module-providers.enum';

@Injectable()
export class PactVerifierService {
  public constructor(@Inject(PactModuleProviders.ProviderOptions) private readonly options: PactProviderOptions) {}

  public async verify(app: INestApplication): Promise<unknown> {
    const host = new URL(this.options.providerHost || 'http://localhost');

    await app.listen(host.port || (await getPort()), host.hostname);

    // this can throw an error, we are sure the app will close after calling finally
    return new Verifier({ ...this.options, providerBaseUrl: await app.getUrl() })
      .verifyProvider()
      .finally(() => app.close());
  }
}
