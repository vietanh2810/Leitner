import { readFileSync } from 'fs';
import { join } from 'path';

const usersFilePath = join(__dirname, '..', 'data', 'users.json');

const readUsersFromFile = () => {
    const usersData = readFileSync(usersFilePath);
    return JSON.parse(usersData);
};

const getUsers = () => {
    return readUsersFromFile();
};

const getUserById = (id) => {
    const users = readUsersFromFile();
    return users.find((user) => user.id === id);
}

const createUser = (user) => {
    const users = readUsersFromFile();
    users.push(user);
    fs.writeFileSync(usersFilePath, JSON.stringify(users));
}

const updateUser = (user) => {
    const users = readUsersFromFile();
    const index = users.findIndex((u) => u.id === user.id);
    users[index] = user;
    fs.writeFileSync(usersFilePath, JSON.stringify(users));
}

const deleteUser = (id) => {
    const users = readUsersFromFile();
    const index = users.findIndex((u) => u.id === id);
    users.splice(index, 1);
    fs.writeFileSync(usersFilePath, JSON.stringify(users));
}

export default {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
