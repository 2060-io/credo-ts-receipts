
# Message Receipts plug-in for Aries Framework JavaScript

This module is used to provide an Aries Agent built with Aries Framework JavaScript means to manage [Message Receipts protocol](https://github.com/2060-io/aries-rfcs/tree/feature/receipts/features/xxxx-receipts).

It's conceived as a plug-in for Aries Framework JavaScript which can be injected to an existing agent instance:

```ts
import { ReceiptsModule } from 'aries-javascript-receipts'


const agent = new Agent({
    config: { /* agent config */
    },
    dependencies,
    modules: { receipts: new ReceiptsModule() },
})


```

Once instantiated, media module API can be accessed under `agent.modules.receipts` namespace

## Usage

> **TODO**