import Model from "./Model";
import { tomorrow } from "../../helpers/date";

export default class Appointment extends Model {
    constructor() {
        super();
        this.id = -1;
        this.customer_id = 0;
        this.employee_id = 0;
        this.service_id = 0;
        this.service_provider_id = 0;
        this.date = tomorrow();
        this.notes = '';
    }
}

export function fromResponse (resp) {
    return resp.data.map(a => {
        let appointment = new Appointment();

        for (const prop in a) {
            if (a.hasOwnProperty(prop) === false) continue;
            if(prop == 'service_id' && !a[prop]) continue; // default service_id = ''
            if(prop == 'confirmed') appointment[prop] = a[prop] ? 1 : 0;
            else appointment[prop] = a[prop];
        }

        appointment.date = new Date(a.date);
        return appointment;
    });
}