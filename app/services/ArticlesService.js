import config from '../config/symphony'

const getList = (currentPage) => {
    return fetch(`${config.api}articles/latest?p=${currentPage}`)
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            return Promise.resolve(response)
        })
        .catch((error) => {
            return Promise.reject(error)
        })
};

export default {
    getList
}