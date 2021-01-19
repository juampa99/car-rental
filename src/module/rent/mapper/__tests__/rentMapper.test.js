const { fromModelToEntity } = require('../rentMapper');
const Rent = require('../../entity/rent');

test('fromModelToEntity devuelve una instancia de Rent', ()=>{
    expect(fromModelToEntity({
            toJSON() {
                return {};
            }
        }
    )).toBeInstanceOf(Rent)
})
