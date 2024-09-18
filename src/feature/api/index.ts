import axios from 'axios';
import qs from 'qs';

const Server = axios.create({
  // baseURL: 'http://52.78.81.43/',
  baseURL: '/api/',
});

const addAccessTokenToServer = (access: string) => {
  Server.defaults.headers.common.Authorization = `Bearer ${access}`;
};

const makeQuery = (query: object) => qs.stringify(query, {addQueryPrefix: true});

export {
  Server,
  addAccessTokenToServer,
  makeQuery
};
