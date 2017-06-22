import { observable, action } from 'mobx';

class User {
  @observable name
  @observable isLogin
  @observable password

  constructor() {
    this.name = '';
    this.password = '';
    this.isLogin = false;
  }

  @action setName = (name) => {
    this.name = name;
  }

  @action setIsLogin = (isLogin) => {
    this.isLogin = isLogin;
  }

  @action setPassword = (password) => {
    this.password = password;
  }
}

const user = new User();
export default user;
export { User };
