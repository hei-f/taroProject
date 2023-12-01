import Taro from "@tarojs/taro";
import {ChatRequestData, FetchStreamOptions} from "../types";

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

//处理stream
export class FetchStream {
  url: string;
  requestInit: RequestInit;
  onMessage: (data: string[], index: number) => void;
  onDone?: () => void;
  onError?: (response: Response) => void;
  onTimeout?: () => void;
  controller: AbortController | null = null;
  timer: number = 0;
  time: number;

  constructor(options: FetchStreamOptions) {
    this.url = options.url;
    this.requestInit = options.requestInit;
    this.onMessage = options.onMessage;
    this.onDone = options.onDone;
    this.onError = options.onError;
    this.createFetchRequest();
    this.onTimeout = options.onTimeout;
    this.time = options.time || 60000;
  }

  createFetchRequest() {
    this.controller = new AbortController();
    this.timeout(); // 开启超时计时器

    fetch(
      this.url,
      {
        method: 'POST',
        signal: this.controller.signal,
        ...this.requestInit
      }
    ).then((response) => {
      clearTimeout(this.timer); // 拿到结果，清除 timeout 计时器

      if (response.status === 200) {
        return response.body!;
      } else {
        // fetch() 返回的 Promise 不会被标记为 reject，即使响应的 HTTP 状态码是 404 或 500
        return Promise.reject(response);
      }
    }).then(async (readableStream) => {

      // 1. 创建 reader 读取流队列
      const reader = readableStream.getReader();

      // 2. 记录流队列中分块的索引
      let index: number = 0;

      while (true) {
        // 3. 读取分块数据，返回一个 Promise
        // （如果分块可用，Promise 返回 { value: theChunk, done: false } 形式）
        // （如果流已关闭，Promise 返回 { value: undefined, done: true } 形式）
        const {value, done} = await reader.read();

        if (done) { // 响应流处理完成

          // 5. 流已关闭，执行外部结束逻辑
          this.onDone?.();
          break;

        } else {

          // 4. 将分块数据转换为 string 交给外部处理函数使用
          const dataText = new TextDecoder().decode(value);
          const data = dataText.split('\n\n').filter(Boolean) as string[];
          // response 响应的消息可能存在多个，以 \n\n 分割
          this.onMessage(data, index++);
        }
      }
    }).catch(response => {
      // ... error 处理
      this.onError?.(response);
    });
  }

  abort() {
    if (this.controller) this.controller.abort();
  }

  timeout() {
    this.timer = window.setTimeout(() => {
      this.abort();
      this.onTimeout?.(); // 外部若传入了监听超时回调，类似 onMessage
    }, this.time);
  }
}


