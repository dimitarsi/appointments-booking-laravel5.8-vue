import Model from "./Model";
import axios from "axios";

export default class ServiceProvider extends Model {
    constructor() {
        super();
        this.name = '';
        this.phone = '';
        this.email = '';
        this.own_domain = '';
        this.application_code = '';
    }

    static async getAll() {
        return await axios.get('/serviceproviders');
    }
}