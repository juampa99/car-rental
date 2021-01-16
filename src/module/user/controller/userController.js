const { fromDataToEntity } = require('../mapper/userMapper');

module.exports = class UserController {
    /**
     *  @param {import('../service/userService')} userService
     * */
    constructor(userService) {
        this.ROUTE_BASE = '/user';
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
        const users = await this.userService.getAll();
        res.render('./user/views/list.njk', {data: { users, route: this.ROUTE_BASE }});
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * */
    async addForm(req, res) {
        let user = {};
        if(req.params && req.params.id)
            user = await this.userService.getById(req.params.id)

        res.render('./user/views/edit_user.njk', {data: {user}, route: this.ROUTE_BASE });
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * */
    async submit(req, res) {
        const user = fromDataToEntity(req.body);

        await this.userService.save(user);

        res.redirect(this.ROUTE_BASE);
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * */
    async delete(req, res) {

        if(req.params && req.params.id) {
            let id = req.params.id;
            await this.userService.delete({id});
        }

        res.redirect(this.ROUTE_BASE);
    }
}
