import { observable, action } from 'mobx';

class Pagination {
  @observable pageIndex
  @observable pageTotal

  constructor() {
    this.pageIndex = 0;
    this.pageTotal = 0;
  }

  @action setPage = (pageIndex, pageTotal) => {
    this.pageIndex = pageIndex;
    this.pageTotal = pageTotal;
  }
}

const pagination = new Pagination();
export default pagination;
export { Pagination };
