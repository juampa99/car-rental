const RentController = require('../rentController');

const serviceMock = {
    save: jest.fn(),
    delete: jest.fn(() => Promise.resolve(true)),
    getById: jest.fn(() => Promise.resolve({})),
    getAll: jest.fn(() => Promise.resolve([]))
}

const controller = new RentController(serviceMock, serviceMock, serviceMock);
const route = controller.ROUTE_BASE;

test('index renderiza list.njk apropiadamente', async () => {
    const renderMock = jest.fn();

    await controller.index({} , {render: renderMock});

    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('./rent/views/list.njk', {data: {rents: [], route} });

})

test('addForm renderiza edit_rent.njk apropiadamente', async () => {
    const renderMock = jest.fn();

    await controller.addForm({} , {render: renderMock});

    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(serviceMock.getById).toHaveBeenCalledTimes(0);
    expect(renderMock).toHaveBeenCalledWith('./rent/views/edit_rent.njk', {
        data: {
            rent: {},
            cars: [],
            users: [],
            route
        }
    });

})

test('delete llama a serviceMock.delete y a res.redirect una vez', async () => {
    const redirectMock = jest.fn();

    await controller.delete({params:{id: 10}} , {redirect: redirectMock});

    expect(serviceMock.delete).toHaveBeenCalledTimes(1);
    expect(redirectMock).toHaveBeenCalledTimes(1);
    expect(redirectMock).toHaveBeenCalledWith('/rent');
})
