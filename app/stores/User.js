import { observable, action } from 'mobx';

class User {
  @observable name;
  @observable isLogin;
  @observable showLogin;
  @observable password;

  constructor() {
    this.name = '';
    this.password = '';
    this.isLogin = false;
    this.showLogin = false;
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

  @action setShowLogin = (showLogin) => {
    this.showLogin = showLogin;
  }
}

const user = new User();
export default user;
export { User };
