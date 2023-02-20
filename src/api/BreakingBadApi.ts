import axios from 'axios';

const breakingBadApi = axios.create({
    baseURL:'https://rickandmortyapi.com/api'
});

export default breakingBadApi;