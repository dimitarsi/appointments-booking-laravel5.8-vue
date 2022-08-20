import wAxios from "./wrapper";
import { fromResponse } from "../components/models/Employee";

const axios = wAxios("employees");

export async function create(sendData) {
    const { data } = await axios("create").post('/dashboard/employees', sendData);
    return data;
}


export async function list() {
    const resp = await axios("list").get('/dashboard/employees');
    return fromResponse(resp);
}

export async function update(id, payload) {
    const { data } = await axios("update").patch(`/dashboard/employees/${id}`, payload);
    return data;
}