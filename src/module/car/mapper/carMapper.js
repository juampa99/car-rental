const Car = require('../entity/car');

function fromDataToEntity({
    id,
    marca,
    modelo,
    anio,
    kms,
    color,
    aire_acondicionado,
    pasajeros,
    automatico
}) {
    return new Car({
        id,
        marca,
        modelo,
        anio,
        kms,
        color,
        aire_acondicionado,
        pasajeros,
        automatico
    })
}

/**
 * @param {import('../model/carModel')} model
 * @returns Car
 * */
function fromModelToEntity(model) {
    return new Car(model.toJSON());
}

module.exports = {
    fromModelToEntity,
    fromDataToEntity
};
