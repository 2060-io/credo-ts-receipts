import {
  AriesFrameworkError,
  ConnectionService,
  injectable,
  Dispatcher,
  MessageSender,
  AgentContext,
  OutboundMessageContext,
} from '@aries-framework/core'
import { MessageReceiptsHandler } from './handlers'
import { MessageReceipt, MessageReceiptOptions } from './messages'
import { ReceiptsService } from './services'

@injectable()
export class ReceiptsApi {
  private messageSender: MessageSender
  private receiptsService: ReceiptsService
  private connectionService: ConnectionService
  private agentContext: AgentContext

  public constructor(
    agentContext: AgentContext,
    dispatcher: Dispatcher,
    messageSender: MessageSender,
    receiptsService: ReceiptsService,
    connectionService: ConnectionService
  ) {
    this.agentContext = agentContext
    this.messageSender = messageSender
    this.receiptsService = receiptsService
    this.connectionService = connectionService
    this.registerHandlers(dispatcher)
  }

  // FIXME: Only send message receipts to connections supporting message receipts protocol and also with a "receipt-required" decorator (TODO in AFJ)
  public async send(options: { connectionId: string; receipts: MessageReceiptOptions[] }) {
    const connection = await this.connectionService.findById(this.agentContext, options.connectionId)

    if (!connection) {
      throw new AriesFrameworkError(`Connection not found with id ${options.connectionId}`)
    }

    const message = await this.receiptsService.createReceiptsMessage({
      receipts: options.receipts.map((item) => new MessageReceipt(item)),
    })

    await this.messageSender.sendMessage(
      new OutboundMessageContext(message, { agentContext: this.agentContext, connection })
    )
  }

  private registerHandlers(dispatcher: Dispatcher) {
    dispatcher.registerMessageHandler(new MessageReceiptsHandler(this.receiptsService))
  }
}
