const Rent = require('./entity/rent');
const RentModel = require('./model/rentModel');
const RentService = require('./service/rentService');
const RentRepository = require('./repository/rentRepository');
const RentController = require('./controller/rentController');

/**
* @param {import('express').Application} app
* @param {import('rsdi').IDIContainer} container
* */
function init(app, container){
    const controller = container.get('RentController');
    controller.configureRoutes(app);
}

module.exports = {
    init,
    RentController,
    RentRepository,
    RentService,
    RentModel,
    Rent
}
