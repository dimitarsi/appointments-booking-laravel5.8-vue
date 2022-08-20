import wAxios from "./wrapper";

const axios = wAxios("services");

import { fromResponse } from "../components/models/Service";

export function create(data) {
    return axios("create").post('/dashboard/services', data);
}

export function update(id, data) {
    return axios("update").patch(`/dashboard/services/${id}`, data);
}

export async function list() {
    const resp = await axios("list").get('/dashboard/services');
    return fromResponse(resp);
}

export function deleteService(id) {
    return axios("delete").delete(`/dashboard/services/${id}`);
}