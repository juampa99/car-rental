const express = require('express');
const configureDI = require('../config/DI');
const app = express();

const container = configureDI(app);

const database = container.get('Sequelize');

const CarModel = container.get('CarModel');
const UserModel = container.get('UserModel');
CarModel.sync({force: true});
UserModel.sync({force: true});
database.sync({force: true});
