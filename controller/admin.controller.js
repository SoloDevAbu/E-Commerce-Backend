const zod = require("zod");
const {Admin} = require("../db")

const adminSchema = zod.object({
    username: zod.string(2, "Username Required"),
    email: zod.string().email(),
    password: zod.string().min(6),
    storename: zod.string(),
})

const registerAdmin = async (req, res) => {
    const validation = adminSchema.safeParse(req.body);

    if(!validation.success){
        return res.status(403).json({
            msg: "make sure everything is given as expected",
            errors: validation.error.errors
        })
    }

    const { username, email, password, storename } = validation.data;

    try {
        const admin = await Admin.create({
            username,
            email,
            password,
            storename
        })
        res.json({
            msg: "User created successfully"
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const getAdminProfile = async (req, res) => {
    const {email, password} = req.headers;
    const storename = req.body.storename;

    try {
        const admin = await Admin.findOne({
            email,
            password,
        })
        if(!admin){
            res.json({
                msg: "Admin not found"
            })
        }

        res.json({
            user: admin.username,
            email: admin.email,
            storename: storename
        })
    } catch (error) {
        res.status(500).json({
            msg: "An error occured",
            error: error.message
        })
    }
}

const updateAdminProfile = async (req, res) => {
    const email = req.headers.email;
    const {username, password, storename} = req.body

    try {
        const updatedAdmin = await Admin.findOneAndUpdate({
            email
        }, {
            username,
            password,
            storename
        }, {
            new: true
        })

        if(!updatedAdmin){
            res.json({
                msg: "User not found"
            })
        }
        res.json({
            msg: "Creadentials Changed successfully"
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = {
    registerAdmin,
    getAdminProfile,
    updateAdminProfile
}