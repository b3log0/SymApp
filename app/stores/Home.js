import { observable, action } from 'mobx';

class Home {
  @observable list;
  @observable isLoading;
  @observable pageIndex;
  @observable pageTotal;
  @observable pathname;

  constructor() {
    this.list = [];
    this.isLoading = true;
    this.pageIndex = 0;
    this.pageTotal = 0;
    this.pathname = 'articles/latest';
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

  @action clearAndSetPathname = (pathname) => {
    this.list = [];
    this.pageIndex = 0;
    this.pageTotal = 0;
    this.pathname = pathname;
  };
}


const home = new Home();
export default home;
export { Home };
