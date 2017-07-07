import ownerStore from '../stores/Owner';
import memberStore from '../stores/Member';
import FetchService from '../services/FetchService';

const getDetail = async () => {
  try {
    if ((memberStore.name === '' || memberStore.name === ownerStore.name) && ownerStore.avatarURL !== '') {
      memberStore.intro = ownerStore.intro;
      memberStore.avatarURL = ownerStore.avatarURL;
      memberStore.name = ownerStore.name;
    } else {
      memberStore.setIsLoading(true);
      const response = await FetchService.get(`user/${memberStore.name === '' ? ownerStore.name : memberStore.name}`);

      const data = response.data;
      memberStore.setAvatarURL(data.user.userAvatarURL210);
      memberStore.setIntro(data.user.userIntro);
      memberStore.setName(data.user.userName);

      if (memberStore.name === '' || memberStore.name === ownerStore.name) {
        ownerStore.intro = memberStore.intro;
        ownerStore.avatarURL = memberStore.avatarURL;
      }

      memberStore.setIsLoading(false);
    }
  } catch (error) {
    console.warn(error);
  }
};

export default {
  getDetail
};
