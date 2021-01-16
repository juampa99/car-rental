const {fromModelToEntity} = require("../mapper/userMapper");
module.exports = class UserRepository {

    /**
     * @param {import('../model/userModel')} userModel
     * */
    constructor(userModel) {
        this.userModel = userModel;
    }

    /**
     * @param {import('../entity/user.js')} user
     * */
    async save(user) {
        let buildOptions;
        let userModel;

        buildOptions = { isNewRecord: !user.id };
        userModel = this.userModel.build(user, buildOptions);
        await userModel.save();
    }

    /**
     * @param {number} id
     */
    async getById(id) {
        return fromModelToEntity(await this.userModel.findOne({where: {id}}));
    }

    /**
     * @returns {Promise<Array<import('../entity/user')>>}
     * */
    async getAll() {
        let users = await this.userModel.findAll();

        users = users.map(fromModelToEntity);

        return users;
    }

    /**
     * @param {User} user
     * @returns {boolean}
     * */
    async delete(user) {
        let destroyedRows = await this.userModel.destroy({where: {id: user.id}});
        let isDeleted = destroyedRows > 0;
        return isDeleted;
    }
}
