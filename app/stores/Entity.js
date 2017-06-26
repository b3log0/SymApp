import { observable, action } from 'mobx';

class Entity {
  @observable list
  @observable isLoading

  constructor() {
    this.list = [];
    this.isLoading = true;
  }

  @action setList = (list) => {
    this.list = list;
  }

  @action setIsLoading = (isLoading) => {
    this.isLoading = isLoading;
  }
}


const entity = new Entity();
export default entity;
export { Entity };
