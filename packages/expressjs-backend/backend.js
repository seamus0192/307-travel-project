import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (job !== undefined && name !== undefined) {
        let result = findUserByNameAndJob(name, job);
        result = {users_list: result};
        res.send(result);
    }
    if (name !== undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

app.get('/users/:id', (req, res) => {
    const id = req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.send(result);
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    const newUser = addUser(userToAdd);
    res.status(201).json(newUser);
});

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    if (deleteUser(id)) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

const findUserByName = (name) => {
    return users['users_list']
        .filter( (user) => user['name'] === name);
}

const findUserByNameAndJob = (name, job) => {
    return users['users_list']
        .filter( (user) => user['name'] === name  && user['job'] === job);
}

const findUserById = (id) =>
    users['users_list']
        .find( (user) => user['id'] === id);

const addUser = (user) => {
    user['id'] = String(Math.floor(Math.random() * 10000));
    users['users_list'].push(user);
    return user;
}

const deleteUser = (id) => {
    if (findUserById(id) !== undefined) {
        users['users_list'] = users['users_list'].filter((user) => user['id'] !== id);
        return true;
    } else {
        return false;
    }
}

const users = {
    users_list : [
        {
            id : 'xyz789',
            name : 'Charlie',
            job: 'Janitor',
        },
        {
            id : 'abc123',
            name: 'Mac',
            job: 'Bouncer',
        },
        {
            id : 'ppp222',
            name: 'Mac',
            job: 'Professor',
        },
        {
            id: 'yat999',
            name: 'Dee',
            job: 'Aspring actress',
        },
        {
            id: 'zap555',
            name: 'Dennis',
            job: 'Bartender',
        }
    ]
}
