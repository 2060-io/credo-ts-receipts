import { BaseEvent } from '@aries-framework/core'
import { MessageReceipt, RequestedReceipt } from '../messages'

export enum ReceiptsEventTypes {
  MessageReceiptsReceived = 'MessageReceiptsReceived ',
  RequestReceiptsReceived = 'RequestReceiptsReceived ',
}

export interface MessageReceiptsReceivedEvent extends BaseEvent {
  type: ReceiptsEventTypes.MessageReceiptsReceived
  payload: {
    connectionId: string
    receipts: MessageReceipt[]
  }
}

export interface RequestReceiptsReceivedEvent extends BaseEvent {
  type: ReceiptsEventTypes.RequestReceiptsReceived
  payload: {
    connectionId: string
    requestedReceipts: RequestedReceipt[]
  }
}
