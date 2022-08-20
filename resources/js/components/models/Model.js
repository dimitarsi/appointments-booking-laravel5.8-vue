import axios from "axios";
import { sqlFormat } from "../../helpers/date";

function contains(heystack) {
    return (property) => {
        return heystack.indexOf(property) > -1;
    }
}

function createObject(method) {
    return (result, item) => {
        return  {
            ...result,
            [item]: method(item)
        }
    }
}

export default class Model {
    async save() {
        const url = this.getUrl();
        const data = this.getProperties();
        const options = {};

        const resp = await axios.post(url, data, options);

        // update properties from response
        for (const prop in resp.data) {
            this[prop] = resp.data[prop];
        }
    }

    getUrl() {
        const className = this.constructor.name;
        return `/dashboard/${className.toLowerCase()}`;
    }

    getPropNames() {
        return Object.keys(this);
    }

    getProperties()
    {
        const hiddenProperties = this.getHiddenProperties();
        const hidden = this.getHiddenProperties();
        const properties = this.getPropNames()
                                 .reduce(createObject(property => {
                                    if(this[property] instanceof Date) {
                                        return sqlFormat(this[property])
                                    }
                                    return this[property]
                                }), {});
        return properties;
    }

    getHiddenProperties()
    {
        return [];
    }
}