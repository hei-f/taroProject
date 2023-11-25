import {makeAutoObservable} from "mobx";

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  openApiKey = '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'

  setOpenApiKey = (key: string) => {
    this.openApiKey = key;
  }


}

export const store = new Store();
