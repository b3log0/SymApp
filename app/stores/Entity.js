import { observable, action } from 'mobx';

class Entity {
  @observable list;
  @observable isLoading;
  @observable pathname;

  constructor() {
    this.list = [];
    this.isLoading = true;
    this.pathname = '';
  }

  @action setList = (list) => {
    this.list = list;
  };

  @action setIsLoading = (isLoading) => {
    this.isLoading = isLoading;
  };

  @action setPathname = (pathname) => {
    this.pathname = pathname;
  };
}


const entity = new Entity();
export default entity;
export { Entity };
