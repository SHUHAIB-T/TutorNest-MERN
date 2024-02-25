import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { ObjectId } from "mongodb";
import Chat from "../model/chatModel";
import Message from "../model/messageModel";

/**
 * @disc    Create message
 * @route   POST /api/message
 * @access  private
 */
export const createMessage: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const chatId = req.body.chatId;
    const chat = await Chat.findById(chatId);
    if (!chat) {
      res.status(400);
      return next(new Error("Chat not found"));
    }
    if (!req.body.senderId) req.body.senderId = req.user?._id;
    const message = new Message({ ...req.body, delivered_to: chat.members });
    const newMessage = await message.save();
    if (newMessage) {
      res.status(200).json({
        success: true,
        message: "chat created successflly!",
        newMessage: newMessage,
      });
    } else {
      next(Error("Internal server Error!"));
    }
  }
);

/**
 * @disc    get messages
 * @route   GET /api/message/:id
 * @access  private
 */
export const getAllMessages: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const chat_id = req.params.id;
    if (!chat_id) {
      res.status(400);
      return next(new Error("Chat not found"));
    }
    const page =
      req.query.page && typeof req.query.page === "string"
        ? req.query.page
        : null;
    const query = page
      ? {
          chatId: new ObjectId(chat_id),
          createdAt: { $lt: new Date(page) },
          delivered_to: {
            $elemMatch: {
              $eq: new ObjectId(req.user?._id),
            },
          },
        }
      : {
          chatId: new ObjectId(chat_id),
          delivered_to: {
            $elemMatch: {
              $eq: new ObjectId(req.user?._id),
            },
          },
        };

    const messages = await Message.aggregate([
      { $sort: { createAt: -1 } },
      { $match: query },
      {
        $limit: 10,
      },
      {
        $sort: { createdAt: 1 },
      },
    ]);
    if (messages) {
      res.status(200).json({
        success: true,
        message: "messages fetched",
        messages,
      });
    } else {
      next(new Error("Internal server error"));
    }
  }
);
