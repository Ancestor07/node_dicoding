const { nanoid } = require("nanoid");
const books = require("./books");

const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, } = request.payload

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = false;
    let { reading } = request.payload
    if (reading == "true" || reading == "1") {
        reading = true
    } else {
        reading = false
    }
    if (name == undefined || name == "" || name == null) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }
    let { readPage, pageCount } = request.payload
    readPage = parseInt(readPage)
    pageCount = parseInt(pageCount)
    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }


    const newBook = { id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt }


    books.push(newBook)


    const isSuccess = books.filter((book) => book.id === id).length > 0

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        })
        response.code(201)
        return response
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;

}

const getBooksHandler = () => ({
    status: "success",
    data: {
        books: books.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
        })),
    }
})
const getBookByIDHandler = (request, h) => {
    const { id } = request.params
    const book = books.filter((book) => book.id === id)
    if (book.length <= 0) {
        const response = h.response({
            status: "fail",
            message: "Buku tidak ditemukan"
        });
        response.code(404);
        return response;

    }
    const response = h.response({
        status: "success",
        data: {
            book: book[0]
        }
    });
    response.code(200);
    return response;
}
const updateBookByIDHandler = (request, h) => {
    const { id } = request.params

    const { name, year, author, summary, publisher, } = request.payload

    const updatedAt = new Date().toISOString();
    const finished = false;
    let { reading } = request.payload
    if (reading == "true" || reading == "1") {
        reading = true
    } else {
        reading = false
    }
    if (name == undefined || name == "" || name == null) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }
    let { readPage, pageCount } = request.payload
    readPage = parseInt(readPage)
    pageCount = parseInt(pageCount)
    if (name == undefined || name == "" || name == null) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }
    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }
    const index = books.findIndex((book) => book.id === id)

    if (index !== -1) {
        books[index] = {
            ...books[index],
            name, year, author, summary, publisher, reading, readPage, pageCount, finished, updatedAt
        }
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        })
        response.code(200)
        return response
    }
    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;

}
const deleteBookByIdHandler = (request, h) => {
    const { id } = request.params
    const index = books.findIndex((book) => book.id === id)
    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
}
module.exports = { addBookHandler, getBooksHandler, getBookByIDHandler, updateBookByIDHandler, deleteBookByIdHandler }