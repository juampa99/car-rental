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
    brand: 'Nisan',
    model: 'Base',
    year: 1999,
    kms: 50000,
    color: 'Rojo',
    air_conditioner: false,
    passengers: 3,
    automatic: false
})

/**
 * @type {import('../../entity/car')}
 * */
let sampleCar2 = new Car({
    id: null,
    brand: 'Toyota',
    model: 'Base',
    year: 2015,
    kms: 5200,
    color: 'Azul',
    air_conditioner: false,
    passengers: 2,
    automatic: true
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

test('Obtiene todos los models de la base de datos', async () => {
    await repository.save(sampleCar);
    await repository.save(sampleCar2);
    let models = await repository.getAll();
    expect(models.length).toEqual(2);
    expect(models[0].brand).toEqual('Nisan');
    expect(models[1].brand).toEqual('Toyota');
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
    expect(firstCar.brand).toEqual('Toyota');
})

test('Hace un getAll() de una base de datos vacia', async ()=>{
    let vacio = await repository.getAll();
    expect(vacio).toHaveLength(0);
})
