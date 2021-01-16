module.exports = class User {
    /**
     * @param {(number | null)} id
     * @param {string} first_name
     * @param {string} last_name
     * @param {string} birth_date
     * @param {string} country
     * @param {string} gender
     * @param {number} phone_number
     * @param {number} id_number
     * @param {string} photo
     * */
    constructor({
            id,
            first_name,
            last_name,
            birth_date,
            country,
            gender,
            phone_number,
            id_number,
            photo
        }
    ) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.birth_date = birth_date;
        this.country = country;
        this.gender = gender;
        this.phone_number = phone_number;
        this.id_number = id_number;
        this.photo = photo;
    }
}
