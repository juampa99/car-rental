const { Sequelize } = require('sequelize');
const { Rent, RentModel, RentRepository } = require('../../module');
const { CarModel, CarRepository, Car } = require('../../../car/module');
const { UserModel, UserRepository, User } = require('../../../user/module');

const sequelizeInstance = new Sequelize({
    dialect: 'sqlite',
    database: ':memory:',
    logging: ()=>{}
})

/**
 * type RentRepository
 * */
let repository;
let carRepository
let userRepository;
let rentModel;
let userModel;
let carModel;


/**
 * @type {import('../../entity/rent')}
 * */
let sampleRent = new Rent({
    id: null,
    from_date: '2020-01-05',
    to_date: '2020-01-08',
    fk_car: 1,
    fk_user: 1
})

/**
 * @type {import('../../entity/rent')}
 * */
let sampleRent2 = new Rent({
    id: null,
    from_date: '2020-01-03',
    to_date: '2020-01-09',
    fk_car: 1,
    fk_user: 1
})

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

let sampleUser = new User({
    id: null,
    first_name: 'John',
    last_name: 'Doe',
    birth_date: '14-03-1990',
    country: 'United States',
    gender: 'Male',
    phone_number: '+1-541-754-3010',
    id_number: 200000000,
    photo: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
})

beforeAll(async ()=>{
    carModel = CarModel.setup(sequelizeInstance);
    userModel = UserModel.setup(sequelizeInstance);

    carRepository = new CarRepository(carModel);
    userRepository = new UserRepository(userModel);

    rentModel = RentModel.setup(sequelizeInstance);
    RentModel.belongsTo(carModel);
    RentModel.belongsTo(userModel);
    repository = new RentRepository(rentModel, userModel, carModel);
})

beforeEach(async (done) => {
    await sequelizeInstance.sync({ force: true });
    done();
});

test('Guarda un rent en la base de datos', async () => {
    await carRepository.save(sampleCar);
    await userRepository.save(sampleUser);
    expect((await rentModel.findAll({include: [carModel, userModel]})).length).toEqual(0);
    repository.save(sampleRent);
    expect((await rentModel.findAll({include: [carModel, userModel]})).length).toEqual(1);
})

test('Obtiene un rent de la base de datos', async () => {
    await carRepository.save(sampleCar);
    await userRepository.save(sampleUser);
    repository.save(sampleRent);
    let rent = await repository.getById(1);
    expect(rent).not.toBeNull();
    expect(rent.id).toEqual(1);
})

test('Obtiene todos los rents de la base de datos', async () => {
    await carRepository.save(sampleCar);
    await userRepository.save(sampleUser);
    await repository.save(sampleRent);
    await repository.save(sampleRent2);
    let models = await repository.getAll();
    expect(models.length).toEqual(2);
    expect(models[0].from_date).toEqual('2020-01-05');
    expect(models[1].from_date).toEqual('2020-01-03');
})


test('Guarda un rent con ID', async () => {
    await carRepository.save(sampleCar);
    await userRepository.save(sampleUser);
    await repository.save(sampleRent);

    let rent = await repository.getById(1);

    expect(rent).not.toBeNull();
    expect(rent.id).toEqual(1);

})

test('Actualiza un rent cuando se guarda uno con el mismo ID', async () => {
    await carRepository.save(sampleCar);
    await userRepository.save(sampleUser);
    await repository.save(sampleRent);

    sampleRent2.id = 1;

    await repository.save(sampleRent2);

    let firstRent = await repository.getById(1);
    expect(firstRent.from_date).toEqual('2020-01-03');
})

test('Hace un getAll() de una base de datos vacia', async ()=>{
    let empty = await repository.getAll();
    expect(empty).toHaveLength(0);
})
