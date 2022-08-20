import axios from 'axios';

const wrapper = ns => chanel => {

    const namespace = `${ns}.${chanel}`;

    return {
        get(url, config) {
            return axios.get(url, { namespace, ...config });
        },
        post(url, data, headers) {
            return axios.post(url, data, {
                ...headers,
                namespace
            });
        },
        patch(url, data, headers) {
            return axios.patch(url, data, {
                ...headers,
                namespace
            });
        },
        delete(url) {
            return axios.delete(url, {
                namespace
            });
        }
    }
}

export default wrapper;