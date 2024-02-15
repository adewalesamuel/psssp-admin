import { Api } from './Api';

const  ENPOINTS = {
    Ebook: 'ebooks',
};

const getAll = (params, signal) => {
    return Api.get(`${ENPOINTS.Ebook}?page=${params?.page ?? 1}`, signal)
}

const getById = (id, signal) => {
    return Api.get(`${ENPOINTS.Ebook}/${id}`, signal);
}

const create = (payload, signal) => {
    return Api.post(ENPOINTS.Ebook, payload, signal)
}

const update = (id, payload, signal) => {
    return Api.put(`${ENPOINTS.Ebook}/${id}`, payload, signal)
}
const destroy = (id, signal) => {
    return Api.erase(`${ENPOINTS.Ebook}/${id}`, signal)
}

export const EbookService = {
    getAll,
    getById,
    create,
    update,
    destroy
}