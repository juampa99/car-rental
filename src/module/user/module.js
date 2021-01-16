const UserModel = require('./model/userModel');
const UserService = require('./service/userService');
const UserRepository = require('./repository/userRepository');
const UserController = require('./controller/userController');

/**
* @param {import('express').Application} app
* @param {import('rsdi').IDIContainer} container
* */
function init(app, container){
    const controller = container.get('UserController');
    controller.configureRoutes(app);
}

module.exports = {
    init,
    UserController,
    UserRepository,
    UserService,
    UserModel
}
