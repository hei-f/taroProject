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
  conversationMap: any = {}
  addConversation = (id: string, content: any) => {
    if (!this.conversationMap[id]) {
      this.conversationMap[id] = [content]
    } else {
      this.conversationMap[id].push(content)
    }
  }
  deleteConversation = (id?: string) => {
    if (!id) {
      this.conversationMap = {
        "newConversation": []
      }
      return;
    }

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
  showResponse = (id: string, content: string) => {
    this.conversationMap[id][this.conversationMap[id].length - 1].response = content;
  }
  setConversation = (id: string, content: any) => {
    this.conversationMap[id] = content;
  }

  //当前对话id
  id = '1'
  setId = (id: string) => {
    this.id = id;
  }

  //对话tabs相关
  conversationTabs = [
    {
      title: '对话1',
      id: '1',
    },
  ]
  setConversationTabs = (tabs: any) => {
    this.conversationTabs = tabs;
  }
  activeTab = 0
  setActiveTab = (index: number) => {
    this.activeTab = index;
  }

  //可选参数相关
  params = {}
  setParams = (params: any) => {
    this.params = params;
  }

}

export const store = new Store();
