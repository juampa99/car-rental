require('dotenv').config();
const express = require('express');
const configureDI = require('../config/DI');
const app = express();

const container = configureDI(app);

const database = container.get('Sequelize');

const CarModel = container.get('CarModel');
const UserModel = container.get('UserModel');
const RentModel = container.get('RentModel');

CarModel.sync({force: true});
UserModel.sync({force: true});
RentModel.sync({force: true});

database.sync({force: true});
