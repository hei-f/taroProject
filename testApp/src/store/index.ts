import {makeAutoObservable} from "mobx";

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  //key相关
  openApiKey = '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'
  setOpenApiKey = (key: string) => {
    this.openApiKey = key;
  }

  //system相关
  system = "You are a helpful assistant. Let's think step by step."
  setSystem = (system: string) => {
    this.system = system;
  }

  //对话相关
  conversationMap = {
    "1": [
      {
        prompt: "Hi, I'm a helpful assistant. Let's think step by step.",
        response: "Hi, I'm a helpful assistant. Let's think step by step.",
      }
    ]
  }
  addConversation = (id: string, content: any) => {
    if (!this.conversationMap[id]) {
      this.conversationMap[id] = [content]
    } else {
      this.conversationMap[id].push(content)
    }
  }
  deleteConversation = (id: string) => {
    if (!this.conversationMap[id]) return;
    delete this.conversationMap[id];
  }
  getConversation = (id: string) => {
    if (!this.conversationMap[id]) {
      return []
    } else {
      return this.conversationMap[id]
    }
  }

  //当前对话id
  id = ''
  setId = (id: string) => {
    this.id = id;
  }


}

export const store = new Store();
