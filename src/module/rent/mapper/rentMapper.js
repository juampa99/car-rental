const Rent = require('../entity/rent');

/**
 * @param {(number | null)} id
 * @param {string} from_date
 * @param {string} to_date
 * @param {number} fk_car
 * @param {number} fk_user
 * @returns Rent
 * */
function fromDataToEntity({
      id,
      from_date,
      to_date,
      fk_car,
      fk_user,
      car,
      user
}) {
    return new Rent({
        id,
        from_date,
        to_date,
        fk_car,
        fk_user,
        car,
        user
    })
}

function fromFormToEntity({
        id,
        from_date,
        to_date,
        fk_car,
        fk_user
}) {
    const real_fk_user = Number(fk_user.substr(0, 1));
    const real_fk_car = Number(fk_car.substr(0, 1));

    return fromDataToEntity({
        id,
        from_date,
        to_date,
        fk_car: real_fk_car,
        fk_user: real_fk_user
    });
}

/**
 * @param {import('../model/rentModel')} model
 * @returns Rent
 * */
function fromModelToEntity(model) {
    let rent;

    if(model)
        rent = new Rent(model.toJSON());
    else
        rent = null;

    return rent;
}

module.exports = {
    fromModelToEntity,
    fromDataToEntity,
    fromFormToEntity
};
