import langFr from '../assets/lang/fr.json';

const _ = (key) => {
    const lowerKey = key.toLowerCase();
    
    return (lowerKey in langFr) ? langFr[lowerKey] : key;
}

export const String = {
    _
}