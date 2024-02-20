import { readFileSync } from 'fs';
import { join } from 'path';

const usersFilePath = join(__dirname, '..', 'data', 'users.json');

/**
 * return user data
 * @returns usersData Json
 */
const readUsersFromFile = () => {
    const usersData = readFileSync(usersFilePath);
    return JSON.parse(usersData);
};

/**
 * return list users
 * @returns readUsersFromFile
 */
const getUsers = () => {
    return readUsersFromFile();
};

/**
 * return one user per id
 * @param  id 
 * @returns user
 */
const getUserById = (id) => {
    const users = readUsersFromFile();
    return users.find((user) => user.id === id);
}

/**
 * create user
 * @param  user 
 */
const createUser = (user) => {
    const users = readUsersFromFile();
    users.push(user);
    fs.writeFileSync(usersFilePath, JSON.stringify(users));
}

/**
 * Update user
 * @param  user 
 */
const updateUser = (user) => {
    const users = readUsersFromFile();
    const index = users.findIndex((u) => u.id === user.id);
    users[index] = user;
    fs.writeFileSync(usersFilePath, JSON.stringify(users));
}
/**
 * Delete user by ID
 * @param  id 
 */
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
