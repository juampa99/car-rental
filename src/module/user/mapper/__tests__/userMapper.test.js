const { fromModelToEntity } = require('../userMapper');
const User = require('../../entity/user');

test('fromModelToEntity devuelve una instancia de User', ()=>{
    expect(fromModelToEntity({
            toJSON() {
                return {};
            }
        }
    )).toBeInstanceOf(User)
})
