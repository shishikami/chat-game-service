import express from "express";
import type { Response, Request } from "express";
import client from '../../client';
import { ChatEventType, RoleType } from "@coze/api";
import CustomError from "../../utils/error";

const router = express.Router();

type StreamChatRequestBody = {
  botId: string
  userId: string
  extraParams: Record<string, string>
  content: string,
  // additionalMessages: EnterMessage[]
}

type StreamChatRequestQuery = {
  conversationId: string
}

router.post('/chat/:conversationId', [], async (req: Request, res: Response, next)=>{
  const {
    botId,
    userId,
    content,
    // extraParams = {},
  } = req.body as StreamChatRequestBody
  const {
    conversationId
  } = req.query as StreamChatRequestQuery
  try {
    const result = await client.chat.stream({
      bot_id: botId,
      user_id: userId,
      conversation_id: conversationId,
      // extra_params: extraParams,
      additional_messages: [{
        role: RoleType.User,
        type: 'question',
        content: content,
        content_type: 'text',
      }],
      auto_save_history: true,
    })
    // 标记为流式响应
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Transfer-Encoding', 'chunked');

    let shouldBreak = false;
    outer: for await (const part of result) {
      const { event, data } = part;
      switch(event){
        case ChatEventType.CONVERSATION_CHAT_CREATED:
        case ChatEventType.CONVERSATION_MESSAGE_COMPLETED:
        case ChatEventType.CONVERSATION_MESSAGE_DELTA: {
          res.write(`event: ${event}\n`, (err) => {
            if(err){
              throw new CustomError("流式响应传输异常", err);
            }
          });
          res.write(`data: ${JSON.stringify(data)}\n\n`, (err) => {
            if(err){
              throw new CustomError("流式响应传输异常", err);
            }
          });
          break;
        }
        case ChatEventType.CONVERSATION_CHAT_COMPLETED:
        case ChatEventType.ERROR: {
          shouldBreak = true;
          break;
        }
        default: {
          res.write(`event: ${event}\n`, (err) => {
            if(err){
              throw new CustomError("流式响应传输异常", err);
            }
          });
          res.write(`data: ${JSON.stringify(data)}\n\n`, (err) => {
            if(err){
              throw new CustomError("流式响应传输异常", err);
            }
          });
          break;
        }
      }
      if (shouldBreak) {
        break outer;
      }
    }
    res.end()
  } catch(e: any) {
    next(e);
  }
})

export default router;