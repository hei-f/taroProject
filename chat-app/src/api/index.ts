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

/*
一个基本的fetch请求： 有两个then
fetch("http://example.com/movies.json")
.then((response) => response.json())
.then((data) => console.log(data));
*/

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
        ...this.requestInit   //body和headers在这里面
      }
    ).then((response) => {
      // console.log('fetch.response=', response)

      clearTimeout(this.timer); // 拿到结果，清除 timeout 计时器

      if (response.status === 200) {
        //fetch返回的是一个promise

        return response.body!;
        //返回的promise在链式调用的then中处理
      } else {
        // fetch() 返回的 Promise 不会被标记为 reject，即使响应的 HTTP 状态码是 404 或 500
        //如果响应的 HTTP 状态码不在 200 - 299 的范围内，则设置 resolve 返回值的 ok 属性为 false
        //仅当网络故障时或请求被阻止时，才会标记为 reject
        return Promise.reject(response);
      }
    }).then(
      //注意这里then的回调是异步的
      async (readableStream) => {

        // 1. readableStream.getReader()创建 reader 读取流队列
        const reader = readableStream.getReader();

        // 2. 记录流队列中分块的索引
        let index: number = 0;

        while (true) {
          // 3.await reader.read()读取分块数据，会返回一个 Promise
          // （如果分块可用，Promise 返回 { value: theChunk, done: false } 形式）
          // （如果流已关闭，Promise 返回 { value: undefined, done: true } 形式）
          const {value, done} = await reader.read();

          if (done) { // 响应流处理完成

            // 5. 流已关闭，执行外部结束逻辑
            this.onDone?.();
            break;

          } else {
            // console.log('fetch.value=', value)

            // 4. 将分块数据转换为 string 交给外部处理函数使用
            const dataText = new TextDecoder().decode(value);

            // console.log('fetch.dataText=', dataText)

            const data = dataText.split('\n\n').filter(Boolean) as string[];
            // response 响应的消息可能存在多个，以 \n\n 分割
            // filter(Boolean)从数组中移除所有假值元素，如 false、null、0、""、undefined 和 NaN

            //原理是当调用 .filter(Boolean) 时，filter 方法会遍历数组中的每个元素。
            // 对于每个元素，它都会调用 Boolean 函数并将该元素作为参数传入(进行类型转换）。
            // 如果 Boolean 函数的返回值为 true，那么该元素就会被保留在新数组中；
            // 如果返回值为 false，那么该元素就会被移除。

            this.onMessage(data, index++); //调用消息处理方法
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


