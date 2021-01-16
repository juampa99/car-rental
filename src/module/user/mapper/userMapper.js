const User = require('../entity/user');

/**
 * @param {number} id
 * @param {string} first_name
 * @param {string} last_name
 * @param {string} birth_date
 * @param {string} country
 * @param {string} gender
 * @param {number} phone_number
 * @param {number} id_number
 * @param {string} photo
 * */
function fromDataToEntity({
    id,
    first_name,
    last_name,
    birth_date,
    country,
    gender,
    phone_number,
    id_number,
    photo
}) {
    return new User({
        id,
        first_name,
        last_name,
        birth_date,
        country,
        gender,
        phone_number,
        id_number,
        photo
    })
}

/**
 * @param {import('../model/userModel')} model
 * @returns User
 * */
function fromModelToEntity(model) {
    let user;

    if(model)
        user = new User(model.toJSON());
    else
        user = null;

    return user;
}

module.exports = {
    fromModelToEntity,
    fromDataToEntity
};
