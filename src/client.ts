import { CozeAPI, COZE_CN_BASE_URL } from '@coze/api';

// 获取令牌
const token = process.env.COZE_API_TOKEN;

// 创建客户端实例
const client = new CozeAPI({
  baseURL: COZE_CN_BASE_URL,
  token: token!,
});

export default client;