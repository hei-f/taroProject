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
        "prompt": "1",
        "response": "2"
      },
      {
        "prompt": "3",
        "response": "4"
      },
    ],
    "2": [
      {
        "prompt": "5",
        "response": "6"
      },
      {
        "prompt": "7",
        "response": "8"
      },
    ],
    "3": [
      {
        "prompt": "9",
        "response": "10"
      },
      {
        "prompt": "11",
        "response": "12"
      },
    ],
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


}

export const store = new Store();
