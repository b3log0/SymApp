import FetchService from '../services/FetchService';

const getDetail = async (name) => {
  try {
    const response = await FetchService.get(`user/${name}`);
    const data = response.data;

    return Promise.resolve({
      intro: data.user.userIntro,
      avatarURL: data.user.userAvatarURL210,
      nickname: data.user.userNickname
    });
  } catch (error) {
    console.warn(error);
    return null;
  }
};

export default {
  getDetail
};
