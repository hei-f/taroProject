import {makeAutoObservable} from "mobx";

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  coute = 0;

  addCount = () => {
    this.coute++;
  }


}

export const store = new Store();
