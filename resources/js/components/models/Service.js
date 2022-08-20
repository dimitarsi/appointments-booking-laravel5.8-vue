import Model from "./Model";

export default class Service extends Model {
    constructor() {
        super();
        this.id = null;
        this.name = "Нова услуга";
        this.price =  0;
        this.status = "available";
        this.duration = 60;
    }
}

export function fromResponse (resp) {

    return resp.data.map(s => {
        let service = new Service();

        for (const prop in s) {
            if (s.hasOwnProperty(prop) === false) {
                continue;
            } else {
                service[prop] = s[prop];
            }
        }

        return service;
    });
}