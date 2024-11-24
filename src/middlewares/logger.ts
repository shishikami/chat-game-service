import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

// 定义中间件函数
const logRequests = (req: Request, res: Response, next: NextFunction) => {
  // 记录请求信息
  const now = new Date();
  const method = req.method;
  const url = req.originalUrl;
  const body = req.body;
  const query = req.query;
  const ip = req.ip;
  const logEntry = `[${now.toISOString()}] ${method} ${url} ${JSON.stringify(body)} ${JSON.stringify(query)} IP: ${ip}\n`;

  // 写入数据
  try {
    const rootDir = process.cwd();
    const logFilePath = path.join(rootDir, 'requests.log');
    fs.appendFile(logFilePath, logEntry, (err) => {
      if (err) {
        console.error('日志记录失败:', err);
      }
    });
  } catch(e) {
    console.log(e)
  }

  // 继续处理请求
  next();
};

export default logRequests;