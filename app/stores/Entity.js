import { observable, action } from 'mobx';

class Entity {
  @observable list;
  @observable isLoading;
  @observable pathname;
  @observable isLoadAll;
  @observable navigation;

  constructor() {
    this.list = [];
    this.isLoading = true;
    this.pathname = '';
    this.isLoadAll = true;
    this.navigation = {};
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

  @action setIsLoadAll = (isLoadAll) => {
    this.isLoadAll = isLoadAll;
  };

  @action setNavigation = (navigation) => {
    this.navigation = navigation;
  };
}


const entity = new Entity();
export default entity;
export { Entity };
