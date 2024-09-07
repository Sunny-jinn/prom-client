import axios from 'axios';

const Server = axios.create({
  baseURL: 'http://52.78.81.43/',
});

const addAccessTokenToServer = (access: string) => {
  Server.defaults.headers.common.Authorization = `Bearer ${access}`;
};

export {
  Server,
  addAccessTokenToServer
};
