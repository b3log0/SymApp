import { observable, action } from 'mobx';

class User {
  @observable name;
  @observable avatarURL;

  constructor() {
    this.name = '';
    this.avatarURL = '';
  }

  @action setName = (name) => {
    this.name = name;
  };

  @action setAvatarURL = (avatarURL) => {
    this.avatarURL = avatarURL;
  };
}

const user = new User();
export default user;
export { User };
