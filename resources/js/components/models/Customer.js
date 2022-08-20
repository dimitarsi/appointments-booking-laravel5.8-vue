import { tomorrow } from "../../helpers/date";
import Model from "./Model";

export default class Customer extends Model {
    constructor() {
        super();
        this.id = null;
        this.first_name = '';
        this.last_name = '';
        this.name = '';
        this.email = '';
        this.phone = '';
        // this.date = tomorrow();
        // this.registered_by = 0;
    }
}

export function fromResponse (resp) {
    return resp.data.list.map(c => {
        let customer = new Customer();

        for (const prop in c) {
            if (c.hasOwnProperty(prop) === false) {
                continue;
            } else {
                if(prop == 'contacts' && c[prop] instanceof Array) {
                    c[prop].forEach(contact => {
                        customer[contact.type] = contact.val;
                    });
                } else {
                    customer[prop] = c[prop];
                }
            }
        }

        customer.name = customer.first_name + ' ' + customer.last_name;

        return customer;
    });
}