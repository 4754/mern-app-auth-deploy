

//For invalid rotes
const notFound = (req,res,next) =>{
    const error = new Error(`Not Found - ${req.originalURL}`);
    res.status(404);
    next(error);
}

// custom error handler

const errorHandler = (err,req,res,next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // to catch Cast error
    if(err.name === "CastError" && err.kind === 'ObjectId'){
        statusCode = 404;
        message = "Resource Not Found";    
    }
    res.status(statusCode).json({
        message,
        // when in production stack is  null
        stack: process.env.NODE_ENV === 'production'? null : err.stack
    })
    next();
}

// export {notFound,errorHandler}

exports.notFound = notFound;
exports.errorHandler = errorHandler;