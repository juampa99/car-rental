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

test('delete llama a serviceMock.delete y a res.redirect una vez', async () => {
    const redirectMock = jest.fn();

    await controller.delete({params:{id: 10}} , {redirect: redirectMock});

    expect(serviceMock.delete).toHaveBeenCalledTimes(1);
    expect(redirectMock).toHaveBeenCalledTimes(1);
    expect(redirectMock).toHaveBeenCalledWith('/car');
})

test('delete llama a serviceMock.delete y a res.redirect una vez', async () => {
    const redirectMock = jest.fn();

    await controller.delete({params:{id: 10}} , {redirect: redirectMock});

    expect(serviceMock.delete).toHaveBeenCalledTimes(1);
    expect(redirectMock).toHaveBeenCalledTimes(1);
    expect(redirectMock).toHaveBeenCalledWith('/car');
})

