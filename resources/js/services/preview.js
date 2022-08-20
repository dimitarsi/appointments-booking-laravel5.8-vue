import wAxios from "./wrapper";

const axios = wAxios("widgets");

export function load() {
    return axios("load").get('/dashboard/preview/params')
}

export function save(data) {
    return axios("update").post('/dashboard/preview', data)
}