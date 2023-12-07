//提交的上下文
export type Context = {
  role: string,
  content: string,
}

//对话
export type Conversation = {
  prompt: string,
  response: string,
}

//对话map
export type ConversationMap = {
  [key: string]: Conversation[]
}

//对话tab
export type ConversationTab = {
  title: string,
  id: string,
  index: number
}

//参数
export type Params = {
  frequency_penalty?: number,
  presence_penalty?: number,
}

export type ParamsDialogValue = {
  frequency_penalty?: string,
  presence_penalty?: string,
}

//关闭icon是否可见
export type CloseIconVisible = {
  [key: string]: boolean,
}

//chatRequestData参数
export type ChatRequestData = {
  model: string,
  messages: Context[],
  stream?: boolean,
}

//request header参数
export type RequestHeader = {
  Authorization?: string,
  "Content-Type"?: string
}

//request参数
export type Request = {
  url: string,
  method: string,
  header?: RequestHeader,
}

//chatRequest参数
export type ChatRequest = Request & {
  data: ChatRequestData,
}

//chatRequest响应数据
export type ChatResponseData = {
  choices: {
    finish_reason: string,
    index: number,
    message: {
      content: string,
      role: string,
    }
  }[],
  created: number,
  id: string,             //单次对话Id，没有上下文关系
  model: string,
  object: "chat.completion" | "chat.completion.chunk",
  system_fingerprint: string | null, //代表模型运行时使用的后端配置
  usage: {
    completion_tokens: number,
    prompt_tokens: number,
    total_tokens: number,
  }
}

//charRequest响应
export type ChatResponse = {
  cookies: string[],
  data: ChatResponseData,
  errMsg: string,
  header: any,
  statusCode: number,
}

// fetchStream参数
export type FetchStreamOptions = {
  url: string,
  requestInit: RequestInit,
  onMessage: (data: string[], index: number) => void,
  onDone?: () => void,
  onError?: (response: Response) => void,
  onTimeout?: () => void,
  time?: number,
}

