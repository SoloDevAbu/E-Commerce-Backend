const zod = require("zod");
const {Admin} = require("../db")

const adminSchema = zod.object({
    username: zod.string(2, "Username Required"),
    email: zod.string().email(),
    password: zod.string().min(6),
})

const registerAdmin = async (req, res) => {
    const validation = adminSchema.safeParse(req.body);

    if(!validation.success){
        return res.status(403).json({
            msg: "make sure everything is given as expected",
            errors: validation.error.errors
        })
    }

    const { username, email, password } = validation.data;

    try {
        const admin = await Admin.create({
            username,
            email,
            password
        })
        res.json({
            msg: "User created successfully"
        })
    } catch (error) {
        res.status(500).json({
            msg: "email already exists"
        })
    }
}

const getAdminProfile = async (req, res) => {
    const {email, password} = req.headers;

    try {
        const admin = await Admin.findOne({
            email,
            password
        })
        if(!admin){
            res.json({
                msg: "Admin not found"
            })
        }

        res.json({
            user: admin.username,
            email: admin.email,
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
    const {username, password} = req.body

    try {
        const updatedAdmin = await Admin.findOneAndUpdate({
            email
        }, {
            username,
            password
        }, {
            new: true
        })

        if(!updatedAdmin){
            res.json({
                msg: "User not found"
            })
        }
        res.json({
            msg: "Password Changed successfully"
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