const { User } = require("../db");

function UserMiddleware(req, res, next){
    const email = req.headers.email;
    const password = req.headers.password;

    User.findOne({
        email,
        password
    })
    .then((user) => {
        if(user){
            next();
        } else {
            res.status(403).json({
                msg: "Unauthorized Access"
            })
        }
    })
}

module.exports = UserMiddleware;