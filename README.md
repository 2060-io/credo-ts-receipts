# Message Receipts extension module for Aries Framework JavaScript

> **Deprecation notice:** Development has been moved to https://github.com/2060-io/credo-ts-didcomm-ext. New NPM package name is @2060.io/credo-ts-didcomm-receipts

This module is used to provide an Aries Agent built with Aries Framework JavaScript means to manage [Message Receipts protocol](https://github.com/genaris/didcomm.org/tree/feat/receipts/site/content/protocols/receipts/1.0).

It's conceived as an extension module for Aries Framework JavaScript which can be injected to an existing agent instance:

```ts
import { ReceiptsModule } from 'credo-ts-receipts'

const agent = new Agent({
  config: {
    /* agent config */
  },
  dependencies,
  modules: { receipts: new ReceiptsModule() },
})
```

Once instantiated, media module API can be accessed under `agent.modules.receipts` namespace

## Usage

> **TODO**
