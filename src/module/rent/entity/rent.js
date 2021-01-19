module.exports = class Rent {
    /**
     * @param {(number | null)} id
     * @param {string} from_date
     * @param {string} to_date
     * @param {number} fk_car
     * @param {number} fk_user
     * */
    constructor({
        id,
        from_date,
        to_date,
        fk_car,
        fk_user,
        car,
        user
        }
    ) {
        this.id = id;
        this.from_date = from_date;
        this.to_date = to_date;
        this.fk_car = fk_car;
        this.fk_user = fk_user;
        this.car = car;
        this.user = user;
    }
}
