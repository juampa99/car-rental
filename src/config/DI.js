const { default: DIContainer, object, get, factory } = require("rsdi");
const { Sequelize } = require('sequelize');

const { CarController, CarService, CarModel, CarRepository } = require('../module/car/module');

function configureSequelizeDatabase() {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './data/data.db',
        logging: console.log
    })

    return sequelize;
}

/**
 * @param (DIContainer) container
 * */
function configureCarModel(container) {
    CarModel.setup(container.get('Sequelize'));
    return CarModel;
}

/**
 * @param (DIContainer) container
 * */
function addCommonDefinitions(container) {
    container.addDefinitions({
        Sequelize: factory(configureSequelizeDatabase)
    })
}

/**
 * @param (DIContainer) container
 * */
function addCarModuleDefinitions(container) {
    container.addDefinitions({
        CarController: object(CarController).construct(get('CarService')),
        CarService: object(CarService).construct(get('CarRepository')),
        CarRepository: object(CarRepository).construct(get('CarModel')),
        CarModel: factory(configureCarModel)
    })
}

module.exports = function configureDI() {
    const container = new DIContainer();
    addCommonDefinitions(container);
    addCarModuleDefinitions(container);
    return container;
}
