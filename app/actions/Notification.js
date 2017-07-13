import notificationStore from '../stores/Notification';
import FetchService from '../services/FetchService';

const getCntx = async () => {
  try {
    const response = await FetchService.get('notification/unread/count');
    notificationStore.setCnts(response.data);

    return Promise.resolve(notificationStore.unreadCnt);
  } catch (error) {
    console.warn(error);
    return null;
  }
};

export default {
  getCntx
};
