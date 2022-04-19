## Babylon Public Test Environment

Babylon Public Test Environment (PTE), a very simple public network simulator that will allow publishing of Scrypto blueprints and components along with composition using the new transaction manifest, with simulator tools sufficient to enable first experimentation with “full stack” dApp development including web front-ends

![Overview](./assets/overview.png)


### Browser Extension

A proof-of-concept browser extension can be used for accessing the test environment via Chrome Browser.

You can download a prebuilt extension from the [latest releases](https://github.com/radixdlt/babylon-pte/releases).


### RESIM CLI

This is a special version of `resim` that talks to the PTE service while exposing the same interface.

You can download the CLI from the [latest releases](https://github.com/radixdlt/babylon-pte/releases).


### API Specification

The API specification of the PTE service can be found [here](./pte-api-spec/api.yaml).


### Typescript SDKs

For DApp developers, three Typescript/Javascript SDKs are now available:

* `pte-sdk` - An SDK for constructing manifest and interacting with PTE service;
* `pte-browser-extension-sdk` - An SDK for interacting with PTE browser extension;
* `pte-manifest-compiler` - A library for compiling a manifest into a transaction.

### DApp Examples

A preliminary DApp example is provided [here](./examples/). 

You're very welcome to add more by making a pull request.
