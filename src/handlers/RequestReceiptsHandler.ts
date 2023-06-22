import { MessageHandler, MessageHandlerInboundMessage } from '@aries-framework/core'
import { RequestReceiptsMessage } from '../messages'
import { ReceiptsService } from '../services'

export class RequestReceiptsHandler implements MessageHandler {
  public supportedMessages = [RequestReceiptsMessage]
  private receiptsService: ReceiptsService

  public constructor(receiptsService: ReceiptsService) {
    this.receiptsService = receiptsService
  }

  public async handle(inboundMessage: MessageHandlerInboundMessage<RequestReceiptsHandler>) {
    return await this.receiptsService.processRequestReceipts(inboundMessage)
  }
}
