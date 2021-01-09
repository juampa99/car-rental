const { Sequelize } = require('sequelize');
const CarRepository = require('../carRepository');
const CarModel = require('../../model/carModel');
const Car = require('../../entity/car');

const sequelizeInstance = new Sequelize({
    dialect: 'sqlite',
    database: ':memory:',
    logging: ()=>{}
})

/**
 * type CarRepository
 * */
let repository;
let carModel;

/**
 * @type {import('../../entity/car')}
 * */
let sampleCar = new Car({
    id: null,
    marca: 'Nisan',
    modelo: 'Base',
    anio: 1999,
    kms: 50000,
    color: 'Rojo',
    aire_acondicionado: false,
    pasajeros: 3,
    automatico: false
})

let sampleCar2 = new Car({
    id: null,
    marca: 'Toyota',
    modelo: 'Base',
    anio: 2015,
    kms: 5200,
    color: 'Azul',
    aire_acondicionado: false,
    pasajeros: 2,
    automatico: true
})

beforeAll(()=>{
    carModel = CarModel.setup(sequelizeInstance);
    repository = new CarRepository(carModel);
})

beforeEach(async (done) => {
    await sequelizeInstance.sync({ force: true });
    done();
});

test('Guarda un auto en la base de datos', async () => {
    expect((await carModel.findAll()).length).toEqual(0);
    repository.save(sampleCar);
    expect(((await repository.getAll()).length)).toEqual(1);
})

test('Obtiene un auto de la base de datos', async () => {
    repository.save(sampleCar);
    let car = await repository.getById(1);
    expect(car).not.toBeNull();
    expect(car.id).toEqual(1);
})

test('Obtiene todos los modelos de la base de datos', async () => {
    await repository.save(sampleCar);
    await repository.save(sampleCar2);
    let models = await repository.getAll();
    expect(models.length).toEqual(2);
    expect(models[0].marca).toEqual('Nisan');
    expect(models[1].marca).toEqual('Toyota');
})


test('Guarda un auto con ID', async () => {
    await repository.save(sampleCar);

    let car = await repository.getById(1);

    expect(car).not.toBeNull();
    expect(car.id).toEqual(1);

})

test('Actualiza un auto cuando se guarda uno con el mismo ID', async () => {
    await repository.save(sampleCar);

    sampleCar2.id = 1;

    await repository.save(sampleCar2);

    let firstCar = await repository.getById(1);
    expect(firstCar.marca).toEqual('Toyota');
})

// Faltan tests
