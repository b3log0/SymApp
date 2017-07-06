import { observable, action } from 'mobx';

class Comments {
  @observable list;
  @observable isLoading;
  @observable pageIndex;
  @observable pageTotal;

  constructor() {
    this.list = [];
    this.isLoading = true;
    this.pageIndex = 0;
    this.pageTotal = 0;
  }

  @action setList = (list) => {
    this.list = list;
  };

  @action setIsLoading = (isLoading) => {
    this.isLoading = isLoading;
  };

  @action setPage = (pageIndex, pageTotal) => {
    this.pageIndex = pageIndex;
    this.pageTotal = pageTotal;
  }
}


const comments = new Comments();
export default comments;
export { Comments };
