// src/app.ts
import express, { Express } from 'express';
import router from './routes'

// 创建Express应用
const app: Express = express();

// 设置中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 挂载路由
app.use('/api', router)

// 导出Express应用
export default app;