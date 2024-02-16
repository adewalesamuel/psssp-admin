import { Api } from './Api';

const  ENPOINTS = {
    Category: 'categories',
};

const getAll = (params, signal) => {
    return Api.get(`${ENPOINTS.Category}?page=${params?.page ?? ''}`, signal)
}

const getById = (id, signal) => {
    return Api.get(`${ENPOINTS.Category}/${id}`, signal);
}

const create = (payload, signal) => {
    return Api.post(ENPOINTS.Category, payload, signal)
}

const update = (id, payload, signal) => {
    return Api.put(`${ENPOINTS.Category}/${id}`, payload, signal)
}
const destroy = (id, signal) => {
    return Api.erase(`${ENPOINTS.Category}/${id}`, signal)
}

export const CategoryService = {
    getAll,
    getById,
    create,
    update,
    destroy
}