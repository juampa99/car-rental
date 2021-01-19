require('dotenv').config();
const express = require('express');
const configureDI = require('../config/DI');
const app = express();

const container = configureDI(app);

const carService = container.get('CarService');
const userService = container.get('UserService');
const rentService = container.get('RentService');

carService.save({
    id: null,
    brand: 'Toyota',
    model: '300x',
    year: 2006,
    kms: 15000,
    color: 'Rojo',
    air_conditioner: 'Yes',
    passengers: 3,
    automatic: 'No',
    photo: 'public/upload/placeholder_photo.png',
    price_per_day: 15,
    stock: 5
})

carService.save({
    id: null,
    brand: 'Mitsubishi',
    model: '5000e',
    year: 2013,
    kms: 5600,
    color: 'Negro',
    air_conditioner: 'Yes',
    passengers: 3,
    automatic: 'Yes',
    photo: 'public/upload/placeholder_photo.png',
    price_per_day: 30,
    stock: 2
})

userService.save({
    id: null,
    first_name: 'John',
    last_name: 'Doe',
    birth_date: '1990-01-07',
    country: 'US',
    gender: 'Male',
    phone_number: '+1516555805',
    id_number: 25645522982,
    photo: 'public/upload/placeholder_photo.png'
})

userService.save({
    id: null,
    first_name: 'Mary',
    last_name: 'Poppin',
    birth_date: '1963-01-07',
    country: 'US',
    gender: 'Female',
    phone_number: '+1556549683',
    id_number: 18004855435,
    photo: 'public/upload/placeholder_photo.png'
})

rentService.save({
    id: null,
    from_date: '2020-01-05',
    to_date: '2020-01-08',
    fk_car: 1,
    fk_user: 1
})
