import Taro from "@tarojs/taro";
import {ChatRequestData} from "../types";

//chat请求
export const chatRequest = (data: ChatRequestData, openApiKey: string) => {
  return Taro.request({
    url: 'https://api.openai.com/v1/chat/completions',
    method: 'POST',
    data,
    header: {
      'Authorization': `Bearer ${openApiKey}`,
      'Content-Type': 'application/json',
    }
  })
}
