import {makeAutoObservable} from "mobx";

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  openApiKey = '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'
  setOpenApiKey = (key: string) => {
    this.openApiKey = key;
  }

  system = "You are a helpful assistant. Let's think step by step."

  setSystem = (system: string) => {
    this.system = system;
  }


}

export const store = new Store();
