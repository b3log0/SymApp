import { observable, action } from 'mobx';

class Member {
  @observable name;
  @observable avatarURL;
  @observable intro;
  @observable isLoading;

  constructor() {
    this.name = '';
    this.avatarURL = '';
    this.intro = '';
    this.isLoading = true;
  }

  @action setName = (name) => {
    this.name = name;
  };

  @action setAvatarURL = (avatarURL) => {
    this.avatarURL = avatarURL;
  };

  @action setIntro = (intro) => {
    this.intro = intro;
  };

  @action setIsLoading = (isLoading) => {
    this.isLoading = isLoading;
  };
}

const member = new Member();
export default member;
export { Member };
