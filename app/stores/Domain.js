import { action } from 'mobx';

class Domain {
  constructor() {
    this.uri = '';
    this.title = '';
  }

  @action setData = (data) => {
    this.uri = data.uri;
    this.title = data.title;
  };

}

const domain = new Domain();
export default domain;
export { Domain };
