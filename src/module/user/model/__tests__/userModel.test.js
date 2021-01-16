const UserModel = require('../userModel');
const {Sequelize} = require("sequelize");

const sequelizeInstance = new Sequelize({
    dialect: 'sqlite',
    database: ':memory:',
    logging: ()=>{} // Para evitar ensuciar la consola
})

test('Una vez hecho el setup y sincronizado el modelo, la tabla users existe', async () => {
    UserModel.setup(sequelizeInstance);
    await UserModel.sync({force: true});
    expect(await UserModel.findAll()).toEqual([]);
})


