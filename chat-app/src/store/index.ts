import {makeAutoObservable} from "mobx";
import {CloseIconVisible, Conversation, ConversationMap, ConversationTab, Params} from "src/types";

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  //环境相关
  env = 'WEAPP'
  setEnv = (env: string) => {
    this.env = env;
  }

  //key相关
  openApiKey = ''
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
        "1": []
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

  get getId() {
    if (this.conversationTabs && this.conversationTabs[this.activeTab]) {
      return this.conversationTabs[this.activeTab].id;
    } else {
      return '1'
    }
  }

  //tab的closeIcon相关
  closeIconVisible: CloseIconVisible = {}
  setCloseIconVisible = (id: string, visible: boolean) => {
    this.closeIconVisible[id] = visible;
  }
  clearCloseIconVisible = () => {
    this.closeIconVisible = {}
  }

  //可选参数相关
  params: Params = {}
  setParams = (params: Params) => {
    this.params = params;
  }

  //是否在加载中
  loading = false
  setLoading = (loading: boolean) => {
    this.loading = loading;
  }

}

export const store = new Store();
