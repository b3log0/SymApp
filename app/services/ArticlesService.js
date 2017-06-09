import config from '../config/symphony'

const getList = fetch(`${config.api}articles/latest?p=1`);

export default {
    getList
}