const CarController = require('../carController');

const serviceMock = {
    save: jest.fn(),
    delete: jest.fn(() => Promise.resolve(true)),
    getById: jest.fn(() => Promise.resolve({})),
    getAll: jest.fn(() => Promise.resolve([]))
}

const controller = new CarController(serviceMock);

test('index renderea index.html apropiadamente', async () => {
    const renderMock = jest.fn();

    await controller.index({} , {render: renderMock});

    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('./car/views/list.njk', {data: {cars: []} });

})
