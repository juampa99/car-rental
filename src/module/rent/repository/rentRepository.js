const {fromModelToEntity} = require("../mapper/rentMapper");
module.exports = class RentRepository {

    /**
     * @param {import('../model/rentModel')} rentModel
     * @param {import('../../user/model/userModel)} userModel
     * @param {import('../../car/model/carModel)} carModel
     * */
    constructor(rentModel, userModel, carModel) {
        this.rentModel = rentModel;
        this.userModel = userModel;
        this.carModel = carModel;
    }

    /**
     * @param {import('../entity/rent.js')} rent
     * */
    async save(rent) {
        let buildOptions;
        let rentModel;

        buildOptions = { isNewRecord: !rent.id };
        rentModel = this.rentModel.build(rent, buildOptions);
        await rentModel.save();
    }

    /**
     * @param {number} id
     */
    async getById(id) {
        return fromModelToEntity((await this.rentModel.findByPk(id, {include: [this.carModel, this.userModel]} )));
    }

    /**
     * @returns {Promise<Array<import('../entity/rent')>>}
     * */
    async getAll() {
        let rents = await this.rentModel.findAll({include: [this.carModel, this.userModel]});

        rents = rents.map(fromModelToEntity);

        return rents;
    }

    /**
     * @param {Rent} rent
     * @returns {boolean}
     * */
    async delete(rent) {
        let destroyedRows = await this.rentModel.destroy({where: {id: rent.id}});
        let isDeleted = destroyedRows > 0;
        return isDeleted;
    }
}
