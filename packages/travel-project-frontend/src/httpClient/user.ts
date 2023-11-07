import axios from 'axios';
import { Prisma } from '@prisma/client';

const signup = async (user: Prisma.UserCreateInput) => {
    const response = await axios.post('http://localhost:8000/user', {
        username: user.username,
        password: user.password
    });

    return response.data
}

const login = async (user: Prisma.UserCreateInput) => {
    const response = await axios.put('http://localhost:8000/user', {
        username: user.username,
        password: user.password
    });

    return response.data
}

export { signup, login }