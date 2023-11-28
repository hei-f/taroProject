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

//request响应数据



