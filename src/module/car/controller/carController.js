const { fromDataToEntity } = require('../mapper/carMapper');

module.exports = class CarController {
    /**
     *  @param {import('../service/carService')} carService
     * */
    constructor(carService) {
        this.ROUTE_BASE = '/car';
        this.carService = carService;
    }

    /**
     * @param {import('express').Application} app
     * */
    configureRoutes(app) {
        app.get(`${this.ROUTE_BASE}/`, this.index.bind(this));
        app.get(`${this.ROUTE_BASE}/add/:id`, this.addForm.bind(this));
        app.get(`${this.ROUTE_BASE}/add`, this.addForm.bind(this));
        app.post(`${this.ROUTE_BASE}/submit`, this.submit.bind(this));
        app.get(`${this.ROUTE_BASE}/delete/:id`, this.delete.bind(this));
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * */
    async index(req, res) {
        const cars = await this.carService.getAll();
        res.render('./car/views/list.njk', {data: { cars }});
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * */
    async addForm(req, res) {
        let car = {};
        if(req.params && req.params.id)
            car = await this.carService.getById(req.params.id)

        res.render('./car/views/edit_car.njk', {data: {car} });
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * */
    async submit(req, res) {
        const car = fromDataToEntity(req.body);

        await this.carService.save(car);

        res.redirect(this.ROUTE_BASE);
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * */
    async delete(req, res) {

        if(req.params && req.params.id) {
            let id = req.params.id;
            await this.carService.delete({id});
        }

        res.redirect(this.ROUTE_BASE);
    }
}
