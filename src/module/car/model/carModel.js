const { Model, DataTypes: {INTEGER, STRING} } = require("sequelize");

module.exports = class CarModel extends Model{
    /**
     * @param {import('sequelize').Sequelize} sequelizeInstance
     * @returns {typeof CarModel}
     * */
    static setup(sequelizeInstance) {
        CarModel.init({
            id: {
                type: INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            },
            brand: STRING,
            model: STRING,
            year: INTEGER,
            kms: INTEGER,
            color: STRING,
            air_conditioner: STRING,
            passengers: INTEGER,
            automatic: STRING,
            photo: STRING,
            price_per_day: INTEGER,
            stock: INTEGER
        },
        {
            sequelize: sequelizeInstance,
            modelName: 'car',
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        })
        return CarModel;
    }
}
