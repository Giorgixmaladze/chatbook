
// შეიქმნა კლასი სახელად AppError რომლის საშუალებითაც შეგვიძლია შევქმნათ ერორი და დავაბრუნოთ უფრო კარგი სტრუქტურის სახით

class AppError extends Error {
    constructor(message, statusCode) {
        super(message)

        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"
        this.isOperational = true

        Error.captureStackTrace(this, this.constructor)
    }
}



module.exports = AppError