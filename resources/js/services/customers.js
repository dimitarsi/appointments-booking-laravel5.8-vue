import wAxios from "./wrapper";
import { fromResponse } from "../components/models/Customer";

const axios = wAxios("customers");

export function create(customer) {
    return axios("create").post("/dashboard/customer", customer);
}

export async function list() {
    const resp = await axios("load").get("/dashboard/customers");
    return fromResponse(resp);
}

export function update(customer) {
    return axios("update").patch(`/dashboard/customers/${customer.id}`, customer);
}
