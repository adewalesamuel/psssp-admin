import langFr from '../assets/lang/fr.json';

const _ = (key) => {
    return (key in langFr) ? langFr[key] : key;
}

export const String = {
    _
}