/**
 * @typedef {import('../entity/car')} Car
 */

module.exports = class CarService {
    /**
     *  @param {import('../repository/carRepository')}
     * */
    constructor(carRepository) {
        this.carRepository = carRepository;
    }

    /**
     * @param {Car} car
     */
    async save(car) {
        if(car === undefined || car === null) {
            throw new Error('No se puede guardar un Car undefined o null')
        }

        await this.carRepository.save(car);
    }

    /**
     * @param {number} id
     * @returns {Car}
     * */
    async getById(id) {
        if(id === undefined) {
            throw new Error('No se puede obtener un auto con id undefined')
        }

        return (await this.carRepository.getById(id));
    }

    /**
     * @returns {Car[]}
     * */
    async getAll() {
        return (await this.carRepository.getAll());
    }

    /**
     * @param {Car} car
     * @returns {boolean}
     * */
    async delete(car) {
        if(car === undefined || car === null) {
            throw new Error('No se puede borrar un auto undefined o null');
        }

        return (await this.carRepository.delete(car));
    }


}
