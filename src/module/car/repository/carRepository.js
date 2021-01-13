const {fromModelToEntity} = require("../mapper/carMapper");
module.exports = class CarRepository {

    /**
     * @param {import('../model/carModel')} carModel
     * */
    constructor(carModel) {
        this.carModel = carModel;
    }

    /**
     * @param {import('../entity/car.js')} car
     * */
    async save(car) {
        let buildOptions;
        let carModel;

        buildOptions = { isNewRecord: !car.id };
        carModel = this.carModel.build(car, buildOptions);
        await carModel.save();
    }

    /**
     * @param {number} id
     */
    async getById(id) {
        return fromModelToEntity(await this.carModel.findOne({where: {id}}));
    }

    /**
     * @returns {Promise<Array<import('../entity/car')>>}
     * */
    async getAll() {
        let cars = await this.carModel.findAll();

        cars = cars.map(fromModelToEntity);

        return cars;
    }

    /**
     * @param {Car} car
     * @returns {boolean}
     * */
    async delete(car) {
        let destroyedRows = await this.carModel.destroy({where: {id: car.id}});
        let isDeleted = destroyedRows > 0;
        return isDeleted;
    }
}
