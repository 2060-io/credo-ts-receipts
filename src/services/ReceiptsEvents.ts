import { BaseEvent } from '@aries-framework/core'
import { MessageReceipt } from '../messages'

export enum ReceiptsEventTypes {
  MessageReceiptsReceived = 'MessageReceiptsReceived ',
}

export interface MessageReceiptsReceivedEvent extends BaseEvent {
  type: ReceiptsEventTypes.MessageReceiptsReceived
  payload: {
    connectionId: string
    receipts: MessageReceipt[]
  }
}
