import Model from "./Model";

export default class Employee extends Model {
    constructor() {
        super();
        this.id = null;
        this.first_name = '';
        this.last_name  = '';
        this.email = '';
        this.phone = '';
        this.password = '';
        this.password_confirm = '';
        this.visible = true;
        this.allow_login = true;
        this.allow_add = 'self';
        this.admin = 0;
        this.unavailable_after = null;
        this.unavailable_until = null;
    }
}

export function fromResponse(resp) {
    return resp.data.map(a => {
        let employee = new Employee();

        for (const prop in a) {
            if (a.hasOwnProperty(prop) === false) continue;
            if(prop.indexOf('password') > -1) continue; // default service_id = ''
            employee[prop] = a[prop];
        }

        employee.name = employee.first_name + " " + employee.last_name;

        return employee;
    });
}