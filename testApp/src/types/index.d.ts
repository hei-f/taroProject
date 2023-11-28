export type Context = {
  role: string,
  content: string,
}

export type Conversation = {
  prompt: string,
  response: string,
}

export type ConversationMap = {
  [key: string]: Conversation[]
}

export type ConversationTab = {
  title: string,
  id: string,
}

export type Params = {
  frequency_penalty?: number,
  presence_penalty?: number,
}

export type ParamsDialogValue = {
  frequency_penalty?: string,
  presence_penalty?: string,
}

export type CloseIconVisible = {
  [key: string]: boolean,
}


