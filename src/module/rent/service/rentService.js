/**
 * @typedef {import('../entity/rent')} Rent
 */

module.exports = class RentService {
    /**
     *  @param {import('../repository/rentRepository')} rentRepository
     * */
    constructor(rentRepository) {
        this.rentRepository = rentRepository;
    }

    /**
     * @param {Rent} rent
     */
    async save(rent) {
        if(rent === undefined || rent === null) {
            throw new Error('No se puede guardar un Rent undefined o null')
        }

        await this.rentRepository.save(rent);
    }

    /**
     * @param {number} id
     * @returns {Rent}
     * */
    async getById(id) {
        if(id === undefined) {
            throw new Error('No se puede obtener un rent con id undefined')
        }

        return (await this.rentRepository.getById(id));
    }

    /**
     * @returns {Rent[]}
     * */
    async getAll() {
        return (await this.rentRepository.getAll());
    }

    /**
     * @param {Rent} rent
     * @returns {boolean}
     * */
    async delete(rent) {
        if(rent === undefined || rent === null) {
            throw new Error('No se puede borrar un rent undefined o null');
        }

        return (await this.rentRepository.delete(rent));
    }

    /**
     * @param {Rent} rent
     * @returns number
     * */
    calculateTotalPrice(rent) {
        const priceDay = rent.car.price_per_day;
        let from_date = new Date(rent.from_date).getTime() / 1000 / 60 / 60 / 24;
        let to_date = new Date(rent.to_date).getTime() / 1000 / 60 / 60 / 24;


        return ( (to_date - from_date) * priceDay );
    }

}
