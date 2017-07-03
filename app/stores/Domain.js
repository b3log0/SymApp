import { observable, action } from 'mobx';

class Domain {
  @observable uri;
  @observable title;

  constructor() {
    this.uri = '';
    this.title = '';
  }

  @action setUri = (uri) => {
    this.uri = uri;
  }

  @action setTitle = (title) => {
    this.title = title;
  }

}

const domain = new Domain();
export default domain;
export { Domain };
