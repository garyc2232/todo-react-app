const domain = import.meta.env.DOMAIN || 'localhost';
const urlPort = import.meta.env.API_PORT || 3000;
const BASE_URL = `http://${domain}:${urlPort}`;

export const API = {
  SIGN_IN: `${BASE_URL}/auth/signIn`,
  REFRESH_JWT: `${BASE_URL}/auth/refresh`,
  USER: `${BASE_URL}/user`,
  USER_LIST: (userId: number) => `${BASE_URL}/user/${userId}/list`,
  LIST_TODOS: (listId: number) => `${BASE_URL}/list/${listId}/todo`,
  LIST_TODO: (listId: number, todoId: number) =>
    `${BASE_URL}/list/${listId}/todo/${todoId}`,
  LIST: `${BASE_URL}/list`,
  LISTS: (listId: number) => `${BASE_URL}/list/${listId}`,
  TAG: `${BASE_URL}/tag`,
  STATUS: `${BASE_URL}/status`,
};
