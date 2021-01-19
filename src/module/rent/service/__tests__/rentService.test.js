const RentService = require('../rentService.js');
const Rent = require('../../entity/rent');

const repositoryMock = {
    save: jest.fn(),
    delete: jest.fn(),
    getById: jest.fn(),
    getAll: jest.fn(),
};

let rentService = new RentService(repositoryMock);

test('Pasarle undefined a save tira un error', async () => {
    await expect(rentService.save(undefined))
        .rejects
        .toThrowError();
})

test('Pasarle id undefined a getById tira un error',async () => {
    await expect(rentService.getById(undefined))
        .rejects
        .toThrowError();
})

test('Pasarle id undefined a delete tira un error',async () => {
    await expect(rentService.delete(undefined))
        .rejects
        .toThrowError();
})

test('Eliminar un rent llama al metodo delete una sola vez', async () => {
    await rentService.delete(new Rent({id: 1}));
    expect(repositoryMock.delete).toHaveBeenCalledTimes(1)
})
