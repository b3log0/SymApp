import { observable, action } from 'mobx';

class User {
  @observable name
  @observable isLogin

  constructor() {
    this.name = '';
    this.isLogin = false;
  }

  @action setName = (name) => {
    this.name = name;
  }

  @action setIsLogin = (isLogin) => {
    this.isLogin = isLogin;
  }
}

const user = new User();
export default user;
export { User };
