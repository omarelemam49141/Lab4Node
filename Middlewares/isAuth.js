const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    let token, decodedToken;

    try {
        token = req.get("Authorization").split(" ")[1];
        decodedToken = jwt.verify(token, "superSecretKey");
    } catch(err) {
        err.status = 402;
        err.message = "Not authorized";
        next(err);
    }

    if(decodedToken) {
        req.role = decodedToken.role;
        next();
    }
}