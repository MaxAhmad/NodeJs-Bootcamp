const AppError = require("../utils/appError")

const handleCastErrorDB = err => { // handle cast error from invalid ID(not implementing here) MongoDB error and validation error not implemented too as a result production environment not starting up
    const message = `Invalid ${err.path}: ${err.value}`
    return new AppError(message, 400)
}

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

const sendErrorProd = (err, res) => {
    if(err.isOperational){ // operational error which we know, should be sent to the client
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        })
    } else{// Programming error or unknown error either from external packages which should not be shown to the user instead log the error to the console
        console.error('ERROR', err)
        res.status(500).json({ // send custom message error
            status: 'error',
            message: 'Something went wrong'
        })
    }    
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    if(process.env.NODE_ENV === 'development'){
       sendErrorDev(err, res) 
    }else if(process.env.NODE_ENV === 'production'){
        let error = {... err}
        if(error.name === 'CastError') error = handleCastErrorDB(error)

        sendErrorProd(error, res)
    }
}