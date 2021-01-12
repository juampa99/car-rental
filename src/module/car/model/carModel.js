const { Sequelize, Model, DataTypes } = require("sequelize");

module.exports = class CarModel extends Model{
    /**
     * @param {import('sequelize').Sequelize} sequelizeInstance
     * @returns {typeof clubModel}
     * */
    static setup(sequelizeInstance) {
        CarModel.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            },
            marca: DataTypes.STRING,
            modelo: DataTypes.STRING,
            anio: DataTypes.INTEGER,
            kms: DataTypes.INTEGER,
            color: DataTypes.STRING,
            aire_acondicionado: DataTypes.STRING,
            pasajeros: DataTypes.INTEGER,
            automatico: DataTypes.STRING
        },
        {
            sequelize: sequelizeInstance,
            modelName: 'Car',
            tableName: 'Cars',
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        })
        return CarModel;
    }
}
