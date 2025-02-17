## [2.3.4](https://github.com/omermorad/nestjs-pact/compare/v2.3.3...v2.3.4) (2025-02-17)


### Bug Fixes

* **deps:** add nestjs v11 to peer deps ([#90](https://github.com/omermorad/nestjs-pact/issues/90)) ([81755e3](https://github.com/omermorad/nestjs-pact/commit/81755e3c423bb0810e82ec86adfa83fda3c484fb)), closes [#88](https://github.com/omermorad/nestjs-pact/issues/88)

## [2.3.3](https://github.com/omermorad/nestjs-pact/compare/v2.3.2...v2.3.3) (2025-02-17)


### Bug Fixes

* **deps:** add pact-js v14 to peer deps ([#89](https://github.com/omermorad/nestjs-pact/issues/89)) ([d25365e](https://github.com/omermorad/nestjs-pact/commit/d25365e38bc872b0c991b879ead5af9f269d475f))

## [2.3.2](https://github.com/omermorad/nestjs-pact/compare/v2.3.1...v2.3.2) (2024-11-12)


### Bug Fixes

* **peer-deps:** support pact v13.x & pact-cli for publisher interface ([#84](https://github.com/omermorad/nestjs-pact/issues/84)) ([7ca2136](https://github.com/omermorad/nestjs-pact/commit/7ca21366c1c06622c3f87ede496308324ab77763))

## [2.3.1](https://github.com/omermorad/nestjs-pact/compare/v2.3.0...v2.3.1) (2023-07-10)


### Bug Fixes

* add peer dep pact-js v11 and nest-js v10 ([#47](https://github.com/omermorad/nestjs-pact/issues/47)) ([d90cc37](https://github.com/omermorad/nestjs-pact/commit/d90cc37017a4e86d9b46626bb08f50b47f2e04f3))

# [2.3.0](https://github.com/omermorad/nestjs-pact/compare/v2.2.2...v2.3.0) (2023-01-17)


### Bug Fixes

* add ; back in for index.ts (linting) ([a530c63](https://github.com/omermorad/nestjs-pact/commit/a530c639e5aeb982b6c110154ba5a3a331f43f18))
* add small comment to explain the try/catch for verifier ([bb2a606](https://github.com/omermorad/nestjs-pact/commit/bb2a606dcaa6cbefc40eb340fe23fec6f4838025))
* import/order linting rule, peerDepencency version for @pact-foundation/pact ([da05e65](https://github.com/omermorad/nestjs-pact/commit/da05e658180ecdee4fd6084017f17f45fd9d53a9))
* jest tests with mock modules now work ([b50c702](https://github.com/omermorad/nestjs-pact/commit/b50c702003435adaf096153235ef3158cb5e7efe))
* make verifier a nestjs provider again ([df4249d](https://github.com/omermorad/nestjs-pact/commit/df4249d092694719d4e4f80d38ad533451d1a43d))
* remove lerna, and dont fail-fast ([bf45577](https://github.com/omermorad/nestjs-pact/commit/bf455774a7988cac8559c7c8b892065d648bfa10))
* revert to normal mocks for verifier test ([153e5fb](https://github.com/omermorad/nestjs-pact/commit/153e5fbc88eb35140b00631c3977f349a5bff2ca))
* verifier-service tests added back in ([922258b](https://github.com/omermorad/nestjs-pact/commit/922258b07f8f31de2326172b780aea41833a2572))


### Features

* fix up to working version ([5cab2ac](https://github.com/omermorad/nestjs-pact/commit/5cab2ac6c834ec96e8006004d129fe076ed0a2ab))
* upgrade packages, fix imports, fix return types, fix empty try-catch ([486dcbe](https://github.com/omermorad/nestjs-pact/commit/486dcbe0d15a6c90e78e3e516c6ab0f1a4ec0130))

## [2.2.2](https://github.com/omermorad/nestjs-pact/compare/v2.2.1...v2.2.2) (2023-01-17)


### Bug Fixes

* release config ([#24](https://github.com/omermorad/nestjs-pact/issues/24)) ([8f6515d](https://github.com/omermorad/nestjs-pact/commit/8f6515d10d1ebede302ccf1387d3f0d1b11f31d5))

# [2.2.1](https://github.com/omermorad/nestjs-pact/compare/v2.1.1...v2.2.1) (2022-07-12)

### Feat

* feat: allow configuration of host ([#13](https://github.com/pact-foundation/nestjs-pact/pull/13)) ([01151f3](https://github.com/pact-foundation/nestjs-pact/commit/01151f3fc6613afa2aa0bf0d4155cbd91205b660))

# [2.1.1](https://github.com/omermorad/nestjs-pact/compare/v2.1.0...v2.1.1) (2022-01-18)

### Fix

* fix: get-port dependency ([#10](https://github.com/omermorad/nestjs-pact/pull/10)) ([fdf1af1](https://github.com/omermorad/nestjs-pact/commit/9988378dfa77e2de68b7e9d52adc8c847045b8c7))

# [2.1.0](https://github.com/omermorad/nestjs-pact/compare/v1.0.4...v2.1.0) (2022-01-18)

### Code Refactoring

* deps: support nestjs version 8.x.x ([#9](https://github.com/omermorad/nestjs-pact/pull/9)) ([fdf1af1](https://github.com/omermorad/nestjs-pact/commit/86c4f19231b6d7e36163448be9b835225727d049))

# [2.0.0](https://github.com/omermorad/nestjs-pact/compare/v1.0.4...v2.0.0) (2021-02-02)

### Code Refactoring

* **names:** change the name of the producer module to provider ([#6](https://github.com/omermorad/nestjs-pact/issues/6)) ([fdf1af1](https://github.com/omermorad/nestjs-pact/commit/fdf1af1aec891ddfbd81702fd4e352a2d8db8c66))

### BREAKING CHANGES

* **names:** 'ProducerModule' is now 'ProviderModule';

* docs(readme): add some links to pact and correct some mistakes

* docs(readme): change logo sizes and markup

## [1.0.4](https://github.com/omermorad/nestjs-pact/compare/v1.0.3...v1.0.4) (2020-12-22)


### Bug Fixes

* **tsconfig.build.json:** add commitlint.config.js to excluded files ([#5](https://github.com/omermorad/nestjs-pact/issues/5)) ([ec834a6](https://github.com/omermorad/nestjs-pact/commit/ec834a653f2ef79ac0292c4211341247f586da94))
