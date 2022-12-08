const { addBookHandler, getBooksHandler, getBookByIDHandler, updateBookByIDHandler, deleteBookByIdHandler } = require("./handler");

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getBooksHandler,
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBookByIDHandler,
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: updateBookByIDHandler,
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBookByIdHandler,
    },
];

module.exports = routes;