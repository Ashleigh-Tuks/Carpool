import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';
import { PrismaService } from '@carpool/api/prisma';
import { MessageInput } from '@carpool/api/messages/entities';
// import { Chat } from '@carpool/api/messages/entities';

@Injectable()
export class MessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMessage(message: MessageInput): Promise<Message | null> {
    return this.prisma.message.create({
      data: {
        senderId: message.senderId,
        receiverId: message.receiverId,
        message: message.message,
      },
    });
  }

  async getMessages(senderId: string, receiverId: string): Promise<Message[]> {
    return this.prisma.message.findMany({
      where: {
        OR: [
          {
            senderId,
            receiverId,
          },
          {
            senderId: receiverId,
            receiverId: senderId,
          },
        ],
      },
    });
  }

  // async getChats(userId: string): Promise<Chat[]> {
  //   const chatsWhereReceiver = await this.prisma.message.findMany({
  //     where: {
  //       receiverId: userId,
  //     },
  //     select: {
  //       senderId: true,
  //       sender: {
  //         select: {
  //           name: true,
  //           surname: true,
  //         },
  //       },
  //     },
  //   });

  //   const chatsWhereSender = await this.prisma.message.findMany({
  //     where: {
  //       senderId: userId,
  //     },
  //     select: {
  //       receiverId: true,
  //       receiver: {
  //         select: {
  //           name: true,
  //           surname: true,
  //         },
  //       },
  //     },
  //   });

  //   const chats = [...chatsWhereReceiver, ...chatsWhereSender];

  //   const uniqueChats = chats.reduce((acc, chat) => {
  //     const chatId = chat.senderId || chat.receiverId;
  //     const chatName = chat.sender?.name || chat.receiver?.name;
  //     const chatSurname = chat.sender?.surname || chat.receiver?.surname;
  //   });

  //   return chats;
  // }
}