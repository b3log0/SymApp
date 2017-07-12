import notificationStore from '../stores/Notification';
import FetchService from '../services/FetchService';

const getCntx = async () => {
  try {
    const response = await FetchService.get('notification/unread/count');
    notificationStore.setCnts(response.data);
  } catch (error) {
    console.warn(error);
  }
};

export default {
  getCntx
};
