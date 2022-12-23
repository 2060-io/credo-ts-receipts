import { Lifecycle, scoped } from 'tsyringe'

import { EventEmitter, MessageHandlerInboundMessage } from '@aries-framework/core'
import { MessageReceiptsReceivedEvent, ReceiptsEventTypes } from './ReceiptsEvents'
import { MessageReceiptsHandler } from '../handlers'
import { MessageReceiptsMessage, MessageReceiptsMessageOptions } from '../messages'

@scoped(Lifecycle.ContainerScoped)
export class ReceiptsService {
  private eventEmitter: EventEmitter

  public constructor(eventEmitter: EventEmitter) {
    this.eventEmitter = eventEmitter
  }

  public async createReceiptsMessage(options: MessageReceiptsMessageOptions) {
    const message = new MessageReceiptsMessage(options)

    return message
  }

  public async processReceipts(messageContext: MessageHandlerInboundMessage<MessageReceiptsHandler>) {
    const { message } = messageContext
    const connection = messageContext.assertReadyConnection()

    this.eventEmitter.emit<MessageReceiptsReceivedEvent>(messageContext.agentContext, {
      type: ReceiptsEventTypes.MessageReceiptsReceived,
      payload: {
        connectionId: connection.id,
        receipts: message.receipts,
      },
    })
  }
}
