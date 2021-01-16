/**
 * @typedef {import('../entity/user')} User
 */

module.exports = class UserService {
    /**
     *  @param {import('../repository/userRepository')} userRepository
     * */
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * @param {User} user
     */
    async save(user) {
        if(user === undefined || user === null) {
            throw new Error('No se puede guardar un User undefined o null')
        }

        await this.userRepository.save(user);
    }

    /**
     * @param {number} id
     * @returns {User}
     * */
    async getById(id) {
        if(id === undefined) {
            throw new Error('No se puede obtener un user con id undefined')
        }

        return (await this.userRepository.getById(id));
    }

    /**
     * @returns {User[]}
     * */
    async getAll() {
        return (await this.userRepository.getAll());
    }

    /**
     * @param {User} user
     * @returns {boolean}
     * */
    async delete(user) {
        if(user === undefined || user === null) {
            throw new Error('No se puede borrar un user undefined o null');
        }

        return (await this.userRepository.delete(user));
    }


}
