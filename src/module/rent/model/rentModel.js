const { Model, DataTypes: {INTEGER, STRING} } = require("sequelize");

module.exports = class RentModel extends Model {
    /**
     * @param {import('sequelize').Sequelize} sequelizeInstance
     * @returns {typeof RentModel}
     * */
    static setup(sequelizeInstance) {
        RentModel.init({
            id: {
                type: INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            },
            from_date: STRING,
            to_date: STRING,
            fk_car: {
                type: INTEGER,
                allowNull: false,
                references: {
                    model: {
                        tableName: "cars"
                    },
                    key: "id"
                }
            },
            fk_user: {
                type: INTEGER,
                allowNull: false,
                references: {
                    model: {
                        tableName: "users"
                    },
                    key: "id"
                }
            }
        },
        {
            sequelize: sequelizeInstance,
            modelName: 'rent',
            tableName: 'rents',
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        })
        return RentModel;
    }
}
