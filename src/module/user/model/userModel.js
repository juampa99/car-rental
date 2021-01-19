const { Model, DataTypes: {INTEGER, STRING} } = require("sequelize");

module.exports = class UserModel extends Model{
    /**
     * @param {import('sequelize').Sequelize} sequelizeInstance
     * @returns {typeof UserModel}
     * */
    static setup(sequelizeInstance) {
        UserModel.init({
            id: {
                type: INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            },
            first_name: STRING,
            last_name: STRING,
            birth_date: STRING,
            country: STRING,
            gender: STRING,
            phone_number: STRING,
            id_number: INTEGER,
            photo: STRING
        },
        {
            sequelize: sequelizeInstance,
            modelName: 'user',
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        })
        return UserModel;
    }
}
