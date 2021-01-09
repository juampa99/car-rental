const CarModel = require('../carModel');
const {Sequelize} = require("sequelize");

const sequelizeInstance = new Sequelize({
    dialect: 'sqlite',
    database: ':memory:',
    logging: ()=>{} // Para evitar ensuciar la consola
})

test('Una vez hecho el setup y sincronizado el modelo, la tabla cars existe', async () => {
    CarModel.setup(sequelizeInstance);
    await CarModel.sync({force: true});
    expect(await CarModel.findAll()).toEqual([]);
})
