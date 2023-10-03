function errorHandler(err, req, res, next) {
    let status = 500;
    let message = "Internal Server Error";

    if (err.name === "unauthenticated" || err.name === "JsonWebTokenError") {
        status = 401;
        message = err.name;
        res.status(status).json({ message });
    } else if (
        err.name === "SequelizeValidationError" ||
        err.name === "SequelizeUniqueConstraintError"
    ) {
        status = 400;
        message = err.errors[0].message;
        res.status(status).json({ message });
    } else if (err.name === "badRequest" || err.name === "unauthenticated") {
        status = 400;
        message = err.name;
        res.status(status).json({ message });
    } 
    
    res.status(status).json({ message });
}

module.exports = errorHandler;