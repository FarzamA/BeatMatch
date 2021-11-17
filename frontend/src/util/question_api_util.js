import axios from 'axios';

export const fetchQuestion = (id) => (
    axios.get(`/api/questions/${id}`)
);

export const fetchQuestions = () => (
    axios.get('/api/questions/')
);