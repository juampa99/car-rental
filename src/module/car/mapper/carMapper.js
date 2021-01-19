const Car = require('../entity/car');

function fromDataToEntity({
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
}) {
    let autom = automatic && automatic === 'on' ? 'Yes' : 'No';
    let ac = air_conditioner && air_conditioner === 'on' ? 'Yes' : 'No';

    return new Car({
        id,
        brand,
        model,
        year,
        kms,
        color,
        air_conditioner: ac,
        passengers,
        automatic: autom,
        price_per_day,
        stock
    })
}

/**
 * @param {import('../model/carModel')} model
 * @returns Car
 * */
function fromModelToEntity(model) {
    let car;

    if(model)
        car = new Car(model.toJSON());
    else
        car = null;

    return car;
}

module.exports = {
    fromModelToEntity,
    fromDataToEntity
};
