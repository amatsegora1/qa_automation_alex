const axios = require('axios');


const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});


client.interceptors.request.use(
  (config) => {
    console.log(`Request: ${config.method.toUpperCase()} ${config.url}`);
    console.log('Payload:', config.data);
    return config;
  },
  (error) => {
    console.error('Request error:', error.message);
    return Promise.reject(error);
  }
);


client.interceptors.response.use(
  (response) => {
    console.log(`Response: ${response.status} ${response.config.url}`);
    console.log('Data:', response.data);
    return response;
  },
  (error) => {
    console.error('Response error:', error.message);
    return Promise.reject(error);
  }
);


module.exports = {
  getPosts: () => client.get('/posts'),
  getPostById: (id) => client.get(`/posts/${id}`),
  createPost: (data) => client.post('/posts', data),
  getUsers: () => client.get('/users'),
  createComment: (data) => client.post('/comments', data),
};

