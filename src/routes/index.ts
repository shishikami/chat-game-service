import conversationRouter from './conversation';
import chatRouter from './chat';
import express from "express";
import globalErrorHandler from '../middlewares/globalErrorHandler';
import logRequests from '../middlewares/logger';

const router = express.Router();

// 注册logger
router.use(logRequests)

// 注册项目路由
router.use(conversationRouter);
router.use(chatRouter);

// 全局异常处理中间件
router.use(globalErrorHandler)

export default router;