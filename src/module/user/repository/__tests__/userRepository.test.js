const { Sequelize } = require('sequelize');
const UserRepository = require('../userRepository');
const UserModel = require('../../model/userModel');
const User = require('../../entity/user');

const sequelizeInstance = new Sequelize({
    dialect: 'sqlite',
    database: ':memory:',
    logging: ()=>{}
})

/**
 * type UserRepository
 * */
let repository;
let userModel;

/**
 * @type {import('../../entity/user')}
 * */
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

/**
 * @type {import('../../entity/user')}
 * */
let sampleUser2 = new User({
    id: null,
    first_name: 'Jenny',
    last_name: 'Doe',
    birth_date: '16-05-1990',
    country: 'United States',
    gender: 'Female',
    phone_number: '+1-541-820-4505',
    id_number: 200000001,
    photo: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
})

beforeAll(()=>{
    userModel = UserModel.setup(sequelizeInstance);
    repository = new UserRepository(userModel);
})

beforeEach(async (done) => {
    await sequelizeInstance.sync({ force: true });
    done();
});

test('Guarda un user en la base de datos', async () => {
    expect((await userModel.findAll()).length).toEqual(0);
    repository.save(sampleUser);
    expect(((await repository.getAll()).length)).toEqual(1);
})

test('Obtiene un user de la base de datos', async () => {
    repository.save(sampleUser);
    let user = await repository.getById(1);
    expect(user).not.toBeNull();
    expect(user.id).toEqual(1);
})

test('Obtiene todos los users de la base de datos', async () => {
    await repository.save(sampleUser);
    await repository.save(sampleUser2);
    let models = await repository.getAll();
    expect(models.length).toEqual(2);
    expect(models[0].first_name).toEqual('John');
    expect(models[1].first_name).toEqual('Jenny');
})


test('Guarda un user con ID', async () => {
    await repository.save(sampleUser);

    let user = await repository.getById(1);

    expect(user).not.toBeNull();
    expect(user.id).toEqual(1);

})

test('Actualiza un user cuando se guarda uno con el mismo ID', async () => {
    await repository.save(sampleUser);

    sampleUser2.id = 1;

    await repository.save(sampleUser2);

    let firstUser = await repository.getById(1);
    expect(firstUser.first_name).toEqual('Jenny');
})

test('Hace un getAll() de una base de datos vacia', async ()=>{
    let empty = await repository.getAll();
    expect(empty).toHaveLength(0);
})
