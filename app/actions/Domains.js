import FetchService from '../services/FetchService';

const getDomains = async () => {
  try {
    const response = await FetchService.get('domains');
    return Promise.resolve(response.data);
  } catch (error) {
    console.warn(error);
    return Promise.reject(error);
  }
};

const getTagsByDomain = async (uri) => {
  try {
    const response = await FetchService.get(`domain/${uri}`);
    return Promise.resolve(response.data);
  } catch (error) {
    console.warn(error);
    return Promise.reject(error);
  }
};

export default {
  getDomains,
  getTagsByDomain
};
