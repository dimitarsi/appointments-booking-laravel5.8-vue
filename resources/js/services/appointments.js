import { CancelToken } from "axios";
import { fromResponse } from "../components/models/Appointment";
import { sqlFormatData } from "../helpers/date";
import wAxios from "./wrapper";

const axios = wAxios('appointments');


let source;
export async function load(week)
{   
    const from = week.start;
    const to = week.end;
    if(source) {
        source.cancel('Abort previous request');
    }
    source = CancelToken.source();
    const response = await axios('list').get('/dashboard/appointments/list', { 
        params: {from, to },
        cancelToken: source.token
    });

    source = null;
    return fromResponse(response);
}

export function deleteAppointment(appointment)
{
    const { id } = appointment;
    return axios('delete').delete(`/dashboard/appointments/${id}`);
}

export async function update(id, data)
{
    await axios('update').patch(`/dashboard/appointments/${id}`, sqlFormatData(data));
}

export async function create(data)
{
    const response = await axios('create').post(`/appointments`, sqlFormatData(data));

    return response.data;
}

export async function invite(id, data)
{
    return await axios('invite').post(`/appointments/${id}/calendar`, { email: data.email });
}

export async function sendConfirm(id)
{
    return await axios('confirm').post(`/dashboard/appointments/${id}/send-confirm`);
}