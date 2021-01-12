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
    let autom = automatico && automatico === 'on' ? 'Si' : 'No';
    let aire = aire_acondicionado && aire_acondicionado === 'on' ? 'Si' : 'No';

    return new Car({
        id,
        marca,
        modelo,
        anio,
        kms,
        color,
        aire_acondicionado: aire,
        pasajeros,
        automatico: autom
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
