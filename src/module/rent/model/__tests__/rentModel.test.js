const RentModel = require('../rentModel');
const {Sequelize} = require("sequelize");

const sequelizeInstance = new Sequelize({
    dialect: 'sqlite',
    database: ':memory:',
    logging: ()=>{} // Para evitar ensuciar la consola
})

test('Una vez hecho el setup y sincronizado el modelo, la tabla rents existe', async () => {
    RentModel.setup(sequelizeInstance);
    await RentModel.sync({force: true});
    expect(await RentModel.findAll()).toEqual([]);
})


