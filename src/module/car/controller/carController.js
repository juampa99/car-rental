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
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * */
    async index(req, res) {
        const cars = await this.carService.getAll();
        res.render('./car/views/list.njk', {data: { cars }});
    }
}
