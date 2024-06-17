
const domain = import.meta.env.DOMAIN || 'localhost';
const urlPort = import.meta.env.API_PORT || 3000;
const BASE_URL = `http://${domain}:${urlPort}`;


export const API = {
    SIGN_IN: `${BASE_URL}/auth/signIn`,
    REFRESH_JWT: `${BASE_URL}/auth/refresh`,
    USER: `${BASE_URL}/user`,
    USER_LIST: (id: number) => `${BASE_URL}/user/${id}/list`,
    LIST_TODO: (id: number) => `${BASE_URL}/list/${id}/todo`,
    LIST: `${BASE_URL}/list`,
    TAG: `${BASE_URL}/tag`,
}