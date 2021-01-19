const { fromFormToEntity } = require('../mapper/rentMapper');

module.exports = class RentController {
    /**
     *  @param {import('../service/rentService')} rentService
     *  @param {import('../../car/service/carService')} carService
     *  @param {import('../../user/service/userService')} userService
     * */
    constructor(rentService, carService, userService) {
        this.ROUTE_BASE = '/rent';
        this.rentService = rentService;
        this.carService = carService;
        this.userService = userService;
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
        const rents = await this.rentService.getAll();
        rents.forEach(r=> {
            r.totalPrice = this.rentService.calculateTotalPrice(r);
        } )
        res.render('./rent/views/list.njk', {data: { rents, route: this.ROUTE_BASE }});
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * */
    async addForm(req, res) {
        let rent = {};
        if(req.params && req.params.id)
            rent = await this.rentService.getById(req.params.id)

        const cars = await this.carService.getAll();
        const users = await this.userService.getAll();

        res.render('./rent/views/edit_rent.njk', {data: {rent, cars, users, route: this.ROUTE_BASE} });
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * */
    async submit(req, res) {
        const rent = fromFormToEntity(req.body);

        await this.rentService.save(rent);

        res.redirect(this.ROUTE_BASE);
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * */
    async delete(req, res) {

        if(req.params && req.params.id) {
            let id = req.params.id;
            await this.rentService.delete({id});
        }

        res.redirect(this.ROUTE_BASE);
    }
}
