import wAxios from "./wrapper";


const axios = wAxios('payment');

export async function getToken() {

    const { data } = await axios('token').post('/dashboard/payments/token');
    if(data.token) return data.token;

    return false;
}

export async function createCustomer(nonce, makeDefault) {
    const result = await axios('customer').post('/dashboard/payments/nonce', { nonce, makeDefault });
    return result;
}