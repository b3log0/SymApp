import { api } from '../config/symphony';

const getList = currentPage => fetch(`${api}articles/latest?p=${currentPage}`)
  .then(response => response.json())
  .then(response => Promise.resolve(response))
  .catch(error => Promise.reject(error));

export default {
  getList
};
