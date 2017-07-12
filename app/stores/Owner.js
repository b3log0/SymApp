import { observable, action } from 'mobx';

class Owner {
  @observable showLogin;

  constructor() {
    this.name = '';
    this.isLogin = false;
    this.showLogin = false;
  }

  @action setNameAndLogin = (name, isLogin) => {
    this.name = name;
    this.isLogin = isLogin;
  };

  @action setShowLogin = (showLogin) => {
    this.showLogin = showLogin;
  };
}

const owmer = new Owner();
export default owmer;
export { Owner };
