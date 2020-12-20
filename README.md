[![ISC license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![npm version](http://img.shields.io/npm/v/nestjs-pact.svg?style=flat)](https://npmjs.org/package/@ntegral/nestjs-sentry "View this project on npm")
[![Codecov Coverage](https://img.shields.io/codecov/c/github/omermorad/nestjs-pact/master.svg?style=flat-square)](https://codecov.io/gh/omer-morad-ni/nestjs-pact)
[![CircleCI](https://circleci.com/gh/omermorad/nestjs-pact.svg?style=shield)](https://circleci.com/gh/circleci/circleci-docs)

![alt text](logo.jpg "Logo Title Text 1")

<p align="center">
  <h3 align="center">
    NestJS + Pact
  </h3>

  <p align="center">
    Injectable Pact.js Consumer/Producer for NestJS
  </p>
</p>

## Table Of Contents

- [About](#about)
- [Installation](#installation)
- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## About

This package allows you to consume Pact.js in a way that can be used very easily in NestJS. \
Like the nature of Pact, this package is for testing purposes only.

If you are not familiar with Pact, Pact is fast, easy and reliable testing framework for integrating web apps, APIs and microservices.
Read more on [Pact official website](https://pact.io/)

The package suggest two modules; one for the `Producer` role (verifying), and one for the `Consumer` role (creating Pact files and publish), each loaded separately.
Of course you can akso use both modules and play the role of `Consumer` and `Producer` at the same time.

## Installation

```bash
npm i @websolute/nestjs-pact
```

## Introduction

The use of each of the modules suggested here, is made in the common and accepted form of NestJS modules.
The simplest way is to use the `register` method and pass the settings directly.
It is also enable to use the `registerAsync` method to pass the settings in the form of `useFactory` or `useClass` for example.

One more thing - the usage of the modules is done in tests only, which is not quite common in the use of NestJS modules, so there are some good examples down below.
The obvious advantage of this package is that Pact can be used in combination with the techniques and benefits offered by NestJS.

## Getting Started
### Consumer

### Producer

**Note: it is highly recommended to review the sample project. It makes full use of all parts of the package and illustrates how each can be used to fulfill the appropriate role in Pact's methodology**

## Contributing

If you want to contribute to the project, I will be more than happy! \
Take a few minutes to review the project code, and start get your hands dirty.

It is important to note the following steps beforehand:

1. Fork the repository
2. Create your branch in the form of <bug|feature>/<semver-path>/<description> (`git checkout -b feature/minor/add-something`)
3. Commit the changes to your branch
4. Push your changes to your remote branch
5. Open a pull request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgements

- [@pact-foundation/pact](https://github.com/pact-foundation/pact-js)
- [NestJS](https://github.com/nestjs/nest)
