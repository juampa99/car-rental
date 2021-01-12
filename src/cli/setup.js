const express = require('express');
const configureDI = require('../config/DI');
const app = express();

const container = configureDI(app);

const database = container.get('Sequelize');

const CarModel = container.get('CarModel');
CarModel.sync({force: true});
database.sync({force: true});
