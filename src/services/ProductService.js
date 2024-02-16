import { Api } from './Api';

const  ENPOINTS = {
    Product: 'products',
};

const getAll = (params, signal) => {
    return Api.get(`${ENPOINTS.Product}?page=${params?.page ?? ''}`, signal)
}

const getById = (id, signal) => {
    return Api.get(`${ENPOINTS.Product}/${id}`, signal);
}

const create = (payload, signal) => {
    return Api.post(ENPOINTS.Product, payload, signal)
}

const update = (id, payload, signal) => {
    return Api.put(`${ENPOINTS.Product}/${id}`, payload, signal)
}
const destroy = (id, signal) => {
    return Api.erase(`${ENPOINTS.Product}/${id}`, signal)
}

export const ProductService = {
    getAll,
    getById,
    create,
    update,
    destroy
}