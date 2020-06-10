module.exports = async (req, res, next) => {
    if (!req.user || !req.user.id) {
        next();
        return;
    }
    const token = req.headers.authorization.split(" ")[1]; // require Bearer <token> as Authorization
    // add validation of token, and uncomment next line to send unauthorize response
    //res.status(401).send(toResponse(401, "Unauthorized")).end();
    next();
}

const toResponse = (code, message) => {
    return {
        "code": code,
        "message": message
    }
}