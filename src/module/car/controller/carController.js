module.exports = class CarController {
    /**
     *  @param {import('../service/carService')} carService
     *
     * */
    constructor(carService) {
        this.ROUTE_BASE = '/car';
        this.carService = carService;
    }

    /**
     * @param {import('express').Application} app
     * */
    configureRoutes(app) {
        app.get(this.ROUTE_BASE + '/', )
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * */
    index(req, res) {
        
    }
}
