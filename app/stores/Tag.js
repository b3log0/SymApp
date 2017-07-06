import { observable, action } from 'mobx';

class Tag {
  @observable uri;

  constructor() {
    this.uri = '';
  }

  @action setUri = (uri) => {
    this.uri = uri;
  };

}

const tag = new Tag();
export default tag;
export { Tag };
