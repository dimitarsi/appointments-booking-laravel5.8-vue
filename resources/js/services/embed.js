import wAxios from "./wrapper";

const axios = wAxios("embed");

export function load() {
    return axios("list").get('/dashboard/embed');
}

export function save(payload) {
    return axios("update").post('/dashboard/embed', payload);
}