import { observable, action } from 'mobx';

class Entity {
  @observable list;
  @observable isLoading;
  @observable pathname;
  @observable pageIndex;
  @observable pageTotal;

  constructor() {
    this.list = [];
    this.isLoading = true;
    this.pathname = '';
    this.pageIndex = 0;
    this.pageTotal = 0;
  }

  @action setList = (list, pageIndex, pageTotal) => {
    this.list = list;
    this.pageIndex = pageIndex;
    this.pageTotal = pageTotal;
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
