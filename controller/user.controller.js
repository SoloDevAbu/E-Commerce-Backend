const zod = require("zod");
const { User } = require("../db");

const userSchema = zod.object({
    username: zod.string(2, "Username Required"),
    email: zod.string().email(),
    password: zod.string().min(6),
})

const registerUser = async (req, res) => {
    const validation = userSchema.safeParse(req.body);

    if(!validation.success){
        return res.status(403).json({
            msg: "make sure everything is given as expected",
            errors: validation.error.errors
        })
    }

    const { username, email, password } = validation.data;

    try {
        const user = await User.create({
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

const getUserProfile = async (req, res) => {
    const {email, password} = req.headers;

    try {
        const user = await User.findOne({
            email,
            password
        })
        if(!user){
            res.json({
                msg: "User not found"
            })
        }

        res.json({
            user: user.username,
            email: user.email,
        })
    } catch (error) {
        res.status(500).json({
            msg: "An error occured",
            error: error.message
        })
    }
}

const updateUserProfile = async (req, res) => {
    const email = req.headers.email;
    const {username, password} = req.body

    try {
        const updatedUser = await User.findOneAndUpdate({
            email
        }, {
            username,
            password
        }, {
            new: true
        })

        if(!updatedUser){
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
    registerUser,
    getUserProfile,
    updateUserProfile
}