import axios from 'axios';

const apiGithub = axios.create({
  baseURL: 'https://api.github.com',
});

const apiEscola = axios.create({
  baseURL: 'http://aleodoni.com.br:3333',
});

export { apiGithub, apiEscola };
