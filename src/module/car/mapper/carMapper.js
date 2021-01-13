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
