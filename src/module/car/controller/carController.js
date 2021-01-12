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
        res.render('./car/views/add_form.njk');
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

    async delete(req, res) {
        const id = req.params.id;

        this.carService.delete({id});

        res.redirect(this.ROUTE_BASE);
    }
}
