import { observable, action } from 'mobx';

class Owner {
  @observable name;
  @observable isLogin;
  @observable showLogin;
  @observable avatarURL;
  @observable password;

  constructor() {
    this.name = '';
    this.avatarURL = '';
    this.isLogin = false;
    this.showLogin = false;
    this.password = '';
  }

  @action setName = (name) => {
    this.name = name;
  };

  @action setPassword = (password) => {
    this.password = password;
  };

  @action setIsLogin = (isLogin) => {
    this.isLogin = isLogin;
  };

  @action setAvatarURL = (avatarURL) => {
    this.avatarURL = avatarURL;
  };

  @action setShowLogin = (showLogin) => {
    this.showLogin = showLogin;
  };
}

const owmer = new Owner();
export default owmer;
export { Owner };
