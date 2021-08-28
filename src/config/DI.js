const { default: DIContainer, object, get, factory } = require("rsdi");
const { Sequelize } = require('sequelize');
const path = require('path');
const multer = require('multer');

const { CarController, CarService, CarModel, CarRepository } = require('../module/car/module');
const { UserController, UserService, UserModel, UserRepository } = require('../module/user/module');
const { RentController, RentService, RentModel, RentRepository } = require('../module/rent/module');

function configureSequelizeDatabase() {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: process.env.DB_PATH || process.cwd() + '/data/db.db',
        logging: console.log
    })

    return sequelize;
}

function configureMulter() {
    const storage = multer.diskStorage({
            destination(req, file, cb) {
                cb(null, process.env.PHOTOS_PATH || process.cwd() + '/public/upload/');
            },
            filename(req, file, cb) {
                // Permite que los archivos se sirvan en el navegador en vez de descargarse automaticamente
                cb(null, Date.now() + path.extname(file.originalname));
            }
        }
    );
    return multer({ storage } );
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
function configureUserModel(container) {
    UserModel.setup(container.get('Sequelize'));
    return UserModel;
}

/**
 * @param (DIContainer) container
 * */
function configureRentModel(container) {
    RentModel.setup(container.get('Sequelize'));
    RentModel.belongsTo(container.get('CarModel'), {foreignKey: 'fk_car'});
    RentModel.belongsTo(container.get('UserModel'), {foreignKey: 'fk_user'});
    return RentModel;
}

/**
 * @param (DIContainer) container
 * */
function addCommonDefinitions(container) {
    container.addDefinitions({
        Sequelize: factory(configureSequelizeDatabase),
        Multer: factory(configureMulter)
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

/**
 * @param (DIContainer) container
 * */
function addUserModuleDefinitions(container) {
    container.addDefinitions({
        UserController: object(UserController).construct(get('Multer'), get('UserService')),
        UserService: object(UserService).construct(get('UserRepository')),
        UserRepository: object(UserRepository).construct(get('UserModel')),
        UserModel: factory(configureUserModel)
    })
}

/**
 * @param (DIContainer) container
 * */
function addRentModuleDefinitions(container) {
    container.addDefinitions({
        RentController: object(RentController).construct(get('RentService'), get('CarService'), get('UserService')),
        RentService: object(RentService).construct(get('RentRepository')),
        RentRepository: object(RentRepository).construct(get('RentModel'), get('UserModel'), get('CarModel')),
        RentModel: factory(configureRentModel)
    })
}

module.exports = function configureDI() {
    const container = new DIContainer();
    addCommonDefinitions(container);
    addCarModuleDefinitions(container);
    addUserModuleDefinitions(container);
    addRentModuleDefinitions(container);
    return container;
}
