const CarController = require('../carController');

const serviceMock = {
    save: jest.fn(),
    delete: jest.fn(() => Promise.resolve(true)),
    getById: jest.fn(() => Promise.resolve({})),
    getAll: jest.fn(() => Promise.resolve([]))
}

const controller = new CarController(serviceMock);

test('index renderiza list.njk apropiadamente', async () => {
    const renderMock = jest.fn();

    await controller.index({} , {render: renderMock});

    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('./car/views/list.njk', {data: {cars: []} });

})

test('addForm renderiza edit_car.njk apropiadamente', async () => {
    const renderMock = jest.fn();

    await controller.addForm({} , {render: renderMock});

    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(serviceMock.getById).toHaveBeenCalledTimes(0);
    expect(renderMock).toHaveBeenCalledWith('./car/views/edit_car.njk', {data: {car: {}} });

})
