import { MessageHandler, MessageHandlerInboundMessage } from '@aries-framework/core'
import { MessageReceiptsMessage } from '../messages'
import { ReceiptsService } from '../services'

export class MessageReceiptsHandler implements MessageHandler {
  public supportedMessages = [MessageReceiptsMessage]
  private receiptsService: ReceiptsService

  public constructor(receiptsService: ReceiptsService) {
    this.receiptsService = receiptsService
  }

  public async handle(inboundMessage: MessageHandlerInboundMessage<MessageReceiptsHandler>) {
    return await this.receiptsService.processReceipts(inboundMessage)
  }
}
