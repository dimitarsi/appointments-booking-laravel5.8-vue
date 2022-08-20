import axios from "axios";
import store from "./index";
import { rejectAfter } from "../helpers/promise";

axios.interceptors.request.use(config => {
    
    if(!config.namespace) return config;

    store.commit('network/addPending', {
        namespace: config.namespace,
        url: config.url
    });

    return config;
}, error => {
    // console.log(error);
    return Promise.resolve(error);
});

axios.interceptors.response.use(resp => {
    if(!resp.config.namespace) return resp;

    store.commit('network/removePending', {
        namespace: resp.config.namespace,
        url: resp.config.url
    });

    return resp;
}, error => {
    
    if(!error.config) {
        console.log(error);
        return Promise.reject(error);
    }

    if(!error.config.namespace) return Promise.reject(error);

    store.commit('network/removePending', {
        namespace: error.config.namespace,
        url: error.config.url
    });


    let fromServer = '';
    if(error.response && error.response.data && error.response.data.Error) {
        fromServer = error.response.data.Error
    }

    store.commit('network/addError', {
        namespace: error.config.namespace,
        url: error.config.url,
        fromServer,
        error
    });

    return Promise.reject(error);
});
