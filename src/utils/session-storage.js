export const getFromSessionStorage = (key) => {
    return sessionStorage.getItem(key);
}

export const setToSessionStorage = (key, value) => {
    sessionStorage.setItem(key, value);
}

export const removeFromSessionStorage = (key) => {
    sessionStorage.removeItem(key);
}
