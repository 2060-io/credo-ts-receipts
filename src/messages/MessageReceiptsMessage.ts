import { AgentMessage, IsValidMessageType, parseMessageType } from '@aries-framework/core'
import { IsArray, IsInstance, IsString, IsDate, IsEnum, ValidateNested } from 'class-validator'
import { Expose, Type } from 'class-transformer'

export enum MessageState {
  Created = 'created',
  Submitted = 'submitted',
  Received = 'received',
  Viewed = 'viewed',
  Deleted = 'deleted',
}

export interface MessageReceiptOptions {
  messageId: string
  state: MessageState
  timestamp?: Date
}

export class MessageReceipt {
  public constructor(options: MessageReceiptOptions) {
    if (options) {
      this.messageId = options.messageId
      this.state = options.state
      this.timestamp = options.timestamp ?? new Date()
    }
  }

  @Expose({ name: 'message_id' })
  @IsString()
  public messageId!: string

  @Expose()
  @IsEnum(MessageState)
  public state!: MessageState

  @Expose()
  @Type(() => Date)
  @IsDate()
  public timestamp!: Date
}

export interface MessageReceiptsMessageOptions {
  id?: string
  receipts: MessageReceipt[]
}

export class MessageReceiptsMessage extends AgentMessage {
  public constructor(options?: MessageReceiptsMessageOptions) {
    super()

    if (options) {
      this.id = options.id ?? this.generateId()
      this.receipts = options.receipts
    }
  }

  @IsValidMessageType(MessageReceiptsMessage.type)
  public readonly type = MessageReceiptsMessage.type.messageTypeUri
  public static readonly type = parseMessageType('https://2060.io/didcomm/receipts/0.1/message-receipts')

  @Expose()
  @Type(() => MessageReceipt)
  @IsArray()
  @ValidateNested()
  @IsInstance(MessageReceipt, { each: true })
  public receipts!: MessageReceipt[]
}
