const localStorage = typeof window !== 'undefined' ? 
window.localStorage : {getItem: () => null, setItem: () => null, 
removeItem: () => null};

const getSessionToken = () => {
    return localStorage?.getItem('utk') ?? null;
}

const isLoggedIn = () => {
    if (getSessionToken() === '' || !getSessionToken())
        return false;

    return true;
}

const setSessionToken = token => {
    localStorage?.setItem('utk', token)
}

const setUser = user => {
    localStorage?.setItem('user', JSON.stringify(user))
}

const removeSessionToken = () => {
    localStorage?.removeItem('utk');
    localStorage?.removeItem('user');
}

const redirectIfSessionExpired = (err, history) => {
    if (!err) return;
    
    if (err.status && err.status === 'Token is Expired') {
        removeSessionToken();
        history.push('/auth/login');
    }
}

const getUser = () => {
    return {
        ...JSON.parse(localStorage?.getItem('user') ?? '{}')
    }
}

export const Auth = {
    isLoggedIn,
    getSessionToken,
    setSessionToken,
    removeSessionToken,
    redirectIfSessionExpired,
    getUser,
    setUser
}
