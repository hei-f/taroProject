import {makeAutoObservable} from "mobx";
import {Conversation, ConversationMap, ConversationTab, Params} from "../types";

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
  conversationMap: ConversationMap = {}
  addConversation = (id: string, content: Conversation) => {
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
  setConversation = (id: string, contents: Conversation[]) => {
    this.conversationMap[id] = contents;
  }
  setConversationMap = (map: ConversationMap) => {
    this.conversationMap = map;
  }

  //对话tabs相关
  conversationTabs: ConversationTab[] = [
    {
      title: '对话1',
      id: '1',
    },
  ]
  setConversationTabs = (tabs: ConversationTab[]) => {
    this.conversationTabs = tabs;
  }

  activeTab = 0
  setActiveTab = (index: number) => {
    this.activeTab = index;
  }

  get id() {
    return this.conversationTabs[this.activeTab].id;
  }

  //可选参数相关
  params: Params = {}
  setParams = (params: Params) => {
    this.params = params;
  }

}

export const store = new Store();
