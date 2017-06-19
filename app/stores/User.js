import { observable, action } from 'mobx';

class User {
  @observable name

  constructor() {
    this.name = '';
  }

  @action setName = (name) => {
    this.name = name;
  }
}

const user = new User();
export default user;
export { User };
