const { fromModelToEntity } = require('../carMapper');
const Car = require('../../entity/car');

test('fromModelToEntity devuelve una instancia de Car', ()=>{
    expect(fromModelToEntity({
            toJSON() {
                return {};
            }
        }
    )).toBeInstanceOf(Car)
})
