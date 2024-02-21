import { Utils } from '../utils';

const HOST = 'http://127.0.0.1';
const PORT = '8000';
const URL = import.meta.env.VITE_APP_HOST_URL ?? `${HOST}:${PORT}`;
const ROOT_PATH  = '/api/admin' 
const getHeaders = () => {
    return (new Headers({
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Connection': 'keep-alive',
        'Authorization': `Bearer ${Utils.Auth.getSessionToken()}`
    }));
}
const getFormDataHeaders = () => {
    return (new Headers({
        'Accept': 'application/json',
        'Authorization': `Bearer ${Utils.Auth.getSessionToken()}`
    }));
}

const get = (endpoint, signal=new AbortController().signal) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL}${ROOT_PATH}/${endpoint}`, {
            headers:getHeaders(),
            signal
        })
        .then(response => {
            if (!response.ok) {
                return reject({
                    status: response.status,
                    messages: getResponseErrors(response)
                    });
            }

            return response.json();
        })
        .then(result => {
            resolve(result)
        })
        .catch(error => reject(error))
    })
}

const post = (endpoint, payload='', signal=new AbortController().signal) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL}${ROOT_PATH}/${endpoint}`,
        {
            method:'post', 
            headers:getHeaders(), 
            body:payload,
            signal
        })
        .then(response => {
            if (!response.ok) {
                return reject({
                    status: response.status,
                    messages: getResponseErrors(response)
                    });
            }

            return response.json();
        })
        .then(result => {
            resolve(result)
        })
        .catch(error => reject(error))
    })
}
const postFormData = (endpoint, payload='', signal=new AbortController().signal) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL}${ROOT_PATH}/${endpoint}`,
        {
            method:'post', 
            headers:getFormDataHeaders(), 
            body:payload,
            signal
        })
        .then(response => {
            if (!response.ok) {
                return reject({
                    status: response.status,
                    messages: getResponseErrors(response)
                    });
            }

            return response.json();
        })
        .then(result => {
            resolve(result)
        })
        .catch(error => reject(error))
    })
}

const put = (endpoint, payload='', signal=new AbortController().signal) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL}${ROOT_PATH}/${endpoint}`,
        {
            method:'put', 
            headers:getHeaders(), 
            body:payload,
            signal
        })
        .then(response => {
            if (!response.ok) {
                return reject({
                    status: response.status,
                    messages: getResponseErrors(response)
                    });
            } 

            return response.json();
        })
        .then(result => {
            resolve(result)
        })
        .catch(error => reject(error))
    })
}

const erase = (endpoint, signal=new AbortController().signal) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL}${ROOT_PATH}/${endpoint}`,
        {
            method:'delete', 
            headers:getHeaders(), 
            signal
        })
        .then(response => {
            if (!response.ok) {
                return reject({
                    status: response.status,
                    messages: getResponseErrors(response)
                    });
            }

            return response.json();
        })
        .then(result => {
            resolve(result)
        })
        .catch(error => reject(error))
    })
}

const getResponseErrors = response => {
    return new Promise((resolve, reject) => {
        if (!response) reject(null);
        
        response.json().then(result => {
            let errorMessages = [];

            if ('message' in result && 
            result.message !== "The given data was invalid.")
                errorMessages.push(result.message);
    
            for (let error in result.errors) 
                errorMessages.push(result.errors[error]);

            resolve(errorMessages);
        });    
    })
}

export const Api = {
    get,
    post,
    put,
    erase,
    postFormData
}