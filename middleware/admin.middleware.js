const { Admin } = require("../db");

function AdminMiddleware(req, res, next){
    const email = req.headers.email;
    const password = req.headers.password;

    Admin.findOne({
        email,
        password
    })
    .then((admin) => {
        if(admin){
            next();
        } else {
            res.status(403).json({
                msg: "Unauthorized Access"
            })
        }
    })
}

module.exports = AdminMiddleware;