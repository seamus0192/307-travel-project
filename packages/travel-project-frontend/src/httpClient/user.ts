import axios from 'axios';
import { Prisma } from '@prisma/client';

const signup = async (user: Prisma.UserCreateInput) => {
    const response = await axios.post('travel-hub.azurewebsites.net/user', {
        username: user.username,
        password: user.password
    });

    return response.data
}

const login = async (user: Prisma.UserCreateInput) => {
    const response = await axios.put('travel-hub.azurewebsites.net/user', {
        username: user.username,
        password: user.password
    });

    return response.data
}

export { signup, login }