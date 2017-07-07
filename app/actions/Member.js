import ownerStore from '../stores/Owner';
import memberStore from '../stores/Member';
import FetchService from '../services/FetchService';

const getDetail = async (name) => {
  try {
    if (name !== ownerStore.name || ownerStore.avatarURL === '') {
      memberStore.setIsLoading(true);

      const response = await FetchService.get(`user/${name}`);
      const data = response.data;

      if (name !== ownerStore.name) {
        memberStore.setAvatarURL(data.user.userAvatarURL210);
        memberStore.setIntro(data.user.userIntro);
        memberStore.setName(data.user.userName);
      } else {
        ownerStore.setIntro(data.user.userIntro);
        ownerStore.setAvatarURL(data.user.userAvatarURL210);
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
