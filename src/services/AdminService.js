import { Api } from './Api';

const  ENPOINTS = {
    Admin: 'admins',
};

const getAll = (params, signal) => {
    return Api.get(`${ENPOINTS.Admin}?page=${params?.page ?? 1}`, signal)
}

const getById = (id, signal) => {
    return Api.get(`${ENPOINTS.Admin}/${id}`, signal);
}

const create = (payload, signal) => {
    return Api.post(ENPOINTS.Admin, payload, signal)
}

const update = (id, payload, signal) => {
    return Api.put(`${ENPOINTS.Admin}/${id}`, payload, signal)
}
const destroy = (id, signal) => {
    return Api.erase(`${ENPOINTS.Admin}/${id}`, signal)
}

export const AdminService = {
    getAll,
    getById,
    create,
    update,
    destroy
}