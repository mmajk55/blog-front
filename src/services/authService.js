import axios from 'axios';

const loginUser = ({ email, password }) => (
    axios.post("http://localhost:8000/auth/login", {
        email,
        password
    })
)

const registerUser = ({ email, name, lastName, password }) => axios.post('http://localhost:8000/auth/signup', { email, name, lastName, password });

export default {
    loginUser,
    registerUser
}