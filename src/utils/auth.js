export function getToken(name) {
    return localStorage.getItem(name)
}

export function setToken(name, value) {
    return localStorage.setItem(name, value)
}

export function removeToken(name) {
    return localStorage.removeItem(name)
}