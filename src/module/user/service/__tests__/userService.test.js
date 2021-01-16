const UserService = require('../userService.js');
const User = require('../../entity/user');

const repositoryMock = {
    save: jest.fn(),
    delete: jest.fn(),
    getById: jest.fn(),
    getAll: jest.fn(),
};

let userService = new UserService(repositoryMock);

test('Pasarle undefined a save tira un error', async () => {
    await expect(userService.save(undefined))
        .rejects
        .toThrowError();
})

test('Pasarle id undefined a getById tira un error',async () => {
    await expect(userService.getById(undefined))
        .rejects
        .toThrowError();
})

test('Pasarle id undefined a delete tira un error',async () => {
    await expect(userService.delete(undefined))
        .rejects
        .toThrowError();
})

test('Eliminar un user llama al metodo delete una sola vez', async () => {
    await userService.delete(new User({id: 1}));
    expect(repositoryMock.delete).toHaveBeenCalledTimes(1)
})
