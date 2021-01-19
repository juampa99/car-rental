module.exports = class Car {
    /**
     * @param {number} id
     * @param {string} brand
     * @param {string} model
     * @param {number} year
     * @param {number} kms
     * @param {string} color
     * @param {string} airConditioner
     * @param {number} passengers
     * @param {string} automatic
     * @param {number} price_per_day
     * @param {number} stock
     * */
    constructor({
            id,
            brand,
            model,
            year,
            kms,
            color,
            air_conditioner,
            passengers,
            automatic,
            price_per_day,
            stock
        }
    ) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.kms = kms;
        this.color = color;
        this.air_conditioner = air_conditioner;
        this.passengers = passengers;
        this.automatic = automatic;
        this.price_per_day = price_per_day;
        this.stock = stock;
    }
}
