import { api } from '../config/symphony';

const get = uri => fetch(`${api}${uri}`)
  .then(response => response.json())
  .then(response => Promise.resolve(response))
  .catch(error => Promise.reject(error));

export default {
  get
};
