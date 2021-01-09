const CarService = require('../carService.js');
const Car = require('../../entity/car');

const repositoryMock = {
    save: jest.fn(),
    delete: jest.fn(),
    getById: jest.fn(),
    getAll: jest.fn(),
};

let carService = new CarService(repositoryMock);

test('Pasarle undefined a save tira un error', async () => {
    await expect(carService.save(undefined))
        .rejects
        .toThrowError();
})

test('Pasarle id undefined a getById tira un error',async () => {
    await expect(carService.getById(undefined))
        .rejects
        .toThrowError();
})

test('Pasarle id undefined a delete tira un error',async () => {
    await expect(carService.delete(undefined))
        .rejects
        .toThrowError();
})

test('Eliminar un auto llama al metodo delete una sola vez', async () => {
    await carService.delete(new Car({id: 1}));
    expect(repositoryMock.delete).toHaveBeenCalledTimes(1)
})
