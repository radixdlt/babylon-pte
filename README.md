# Babylon Public Test Environment

Babylon Public Test Environment (PTE), a very simple public network simulator that will allow publishing of Scrypto blueprints and components along with composition using the new transaction manifest, with simulator tools sufficient to enable first experimentation with “full stack” dApp development including web front-ends

![Overview](./assets/overview.png)


## PTE Browser Extension

A proof-of-concept browser extension is provided for accessing the test environment via Chrome Browser.

You can download a prebuilt extension from the [latest releases]([./todo](https://github.com/radixdlt/babylon-pte/releases)).


## PTE RESIM CLI

If you've been using `resim`, you may find the PTE CLI tool useful. It provides the same interfaces but talks to the PTE service.


You can download the CLI from the [latest releases]([./todo](https://github.com/radixdlt/babylon-pte/releases)).


## PTE API Specification

PTE API service is fully specified in OpenAPI v3. You can find the  specification [here](./pte-api-spec/api.yaml).


## PTE Javascript SDKs

For DApp developers, three Typescript/Javascript SDKs are provided:

* `pte-sdk` - An SDK for constructing manifest and interacting with PTE service;
* `pte-wallet-sdk` - An SDK for interacting with PTE browser extension;
* `pte-manifest-compiler` - A library that compiles a manifest into a transaction.

## DApp Examples

Some preliminary DApp examples are provided [here](./examples/). 

You're also welcome to add your own examples by making a pull request.