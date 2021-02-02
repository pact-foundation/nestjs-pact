[![ISC license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![npm version](http://img.shields.io/npm/v/nestjs-pact.svg?style=flat)](https://npmjs.org/package/nestjs-pact "View this project on npm")
[![Codecov Coverage](https://img.shields.io/codecov/c/github/omermorad/nestjs-pact/master.svg?style=flat-square)](https://codecov.io/gh/omer-morad-ni/nestjs-pact)
[![CircleCI](https://circleci.com/gh/omermorad/nestjs-pact.svg?style=shield)](https://circleci.com/gh/circleci/circleci-docs)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

![alt text](logo.jpg "NestJS + Pact")

<p align="center">
  <h3 align="center">
    NestJS + Pact
  </h3>

  <p align="center">
    <strong>Injectable Pact.js Consumer/Provider for NestJS</strong>
  </p>
</p>

## Table Of Contents

- [Installation](#installation)
- [Installation](#end-to-end-example)
- [About](#about)
- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)


## Installation

```bash
npm i -D nestjs-pact @pact-foundation/pact
```

## End to End Example
If you want to see a fully working end-to-end example with NestJS and Pact I recommend you to
[jump to the NestJS official examples at the PactJS Github repository](https://github.com/pact-foundation/pact-js/tree/master/examples)

## About

This package enables you to consume Pact.js in a way that can be used very easily in NestJS. \
Like the nature of Pact, this package is for testing purposes only.

If you are not familiar with Pact, Pact is fast, easy and reliable testing framework for integrating web apps, APIs and microservices.
Read more on [Pact official website](https://pact.io/)

There are two main modules suggested; one for the `Provider` role (`Verifier`), and one for the `Consumer` role (creating Pact files and publish), each loaded separately.
Of course you can also use both modules and play the role of `Consumer` and `Provider` at the same time.

## Introduction

The use of each of the modules suggested here, is made in the common and accepted form of NestJS modules.
The simplest way is to use the `register` method and pass the settings directly.
It is also enable to use the `registerAsync` method to pass the settings in the form of `useFactory` or `useClass` for example.

One more thing - the usage of the modules is done in tests only, which is not quite common in the use of NestJS modules, so there are some good examples down below.
The obvious advantage of this package is that Pact can be used in combination with the techniques and benefits offered by NestJS.

## Getting Started

**Soon we will add a full working end-to-end example to demonstrate how to Pact is working with NestJS with `nestjs-pact` package**

### Consumer

In order to use the `Consumer` module, you need to follow a few simple steps, let's go over it!

First, create a file called `pact.module.ts` in your `test` folder (or wherever you put your tests), and simply
load the `PactConsumerModule` like below:

**test/pact/pact.module.ts**

```typescript
import { Module } from '@nestjs/common';
import { PactConsumerModule } from 'nestjs-pact';

@Module({
  imports: [
    PactConsumerModule.register({ ... }),
  ],
})
export class PactModule {}
```

Yay, now let's create the test file! let's call it `my-test.spec.ts`

**test/pact/my-test.spec.ts**

```typescript
import { Pact } from '@pact-foundation/pact';
import { Test } from '@nestjs/testing';
import { PactFactory } from 'nestjs-pact';
import { PactModule } from '@test/pact/pact.module';

describe('Pact', () => {
  let pactFactory: PactFactory;
  let provider: Pact;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [SomeOtherModule, AndAnotherModuleYouNeed, PactModule],
    }).compile();

    pactFactory = moduleRef.get(PactFactory);

    provider = pactFactory.createContractBetween({
      consumer: 'Consumer Service Name',
      provider: 'Provider Service Name',
    });

    await provider.setup();
  });

  afterEach(() => provider.verify());

  afterAll(() => provider.finalize());

  describe('when something happens', () => {
    describe('and another thing happens too', () => {
      beforeAll(() => provider.addInteraction({ ... }));

      it('should do something', () => {
        return expect( ... );
      });
    });
  });
});
```

Now let's look how we can publish the pacts created from the test file to a Pact broker!

**test/pact/publish-pacts.ts**

```typescript
import { NestFactory } from '@nestjs/core';
import { Logger, LoggerService } from '@nestjs/common';
import { Publisher } from '@pact-foundation/pact';
import { PactModuleProviders } from 'nestjs-pact';
import { PactModule } from '@test/pact/pact.module';

(async () => {
  const app = await NestFactory.createApplicationContext(PactModule);

  const publisher: Publisher = app.get(PactModuleProviders.PactPublisher);
  const logger: LoggerService = app.get(Logger);

  if (process.env.CI !== 'true') {
    logger.log('Skipping Pact publish as not on CI');
    process.exit(0);
  }

  try {
    await publisher.publishPacts();

    logger.log('Pact contract publishing complete!');
    logger.log('');
    logger.log('Head over to https://test.pact.dius.com.au/ and login with');
    logger.log('=> Username: dXfltyFMgNOFZAxr8io9wJ37iUpY42M');
    logger.log('=> Password: O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1');
    logger.log('to see your published contracts.');
  } catch (e) {
    logger.error('Pact contract publishing failed: ', e);
  }
})();
```

`npx ts-node test/pact/publish-pacts.ts`

Run the file and you are good to go :)

Note: in your `tsconfig.json` file make sure you set `allowJs` to `true` in order to run the file

### Provider

The usage in the `Provider` service is quite easy; In your `/test` folder (or wherever you put your tests)
create a simple test module with NestJS `Test.createTestingModule` method and import the `PactProviderModule` module
from `nestjs-pact`.

You can use `register` or `registerAsync` method, make sure you stick to `PactProviderOptions` interface options. \
After creating the Nest application from the testing module, pass the app instance to the `verify` method,
it will generate a random (available) port, spin up the application and run the verifier against the application url.

You can read more about Pact Verification in the [official Pact documentation](https://docs.pact.io/getting_started/verifying_pacts/)

Here is a quick and simple example:

```typescript
import { Test } from '@nestjs/testing';
import { INestApplication, Logger, LoggerService } from '@nestjs/common';
import { PactProviderModule, PactVerifierService } from 'nestjs-pact';
import { AppModule } from '@app/app.module';

describe('Pact Verification', () => {
  let verifierService: PactVerifierService;
  let logger: LoggerService;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, PactProviderModule.register({ ... })],
    }).compile();

    verifierService = moduleRef.get(PactVerifierService);
    logger = moduleRef.get(Logger);

    app = moduleRef.createNestApplication();

    await app.init();
  });

  it('validates the expectations of Matching Service', async () => {
    const { output } = await verifierService.verify(app);

    logger.log('Pact Verification Completed!');
    logger.log(output);
  });

  afterAll(async () => {
    await app.close();
  });
});
```

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgements

- [@pact-foundation/pact](https://github.com/pact-foundation/pact-js)
- [NestJS](https://github.com/nestjs/nest)
