import express from "express";
import type { Response, Request } from "express";
import client from '../../client'
import Result from "../../utils/result";

const router = express.Router();

router.put('/conversation', [], async (req: Request, res: Response, next)=>{
  try {
    const result = await client.conversations.create({});
    res.json(Result.defaultSuccess(result));
  } catch(e: any) {
    next(e);
  }
})

router.get('/conversation/:conversationId', [], async (req: Request, res: Response, next)=>{
  try {
    const result = await client.conversations.retrieve(req.params.conversationId);
    res.json(Result.defaultSuccess(result));
  } catch(e: any) {
    next(e);
  }
})

export default router;