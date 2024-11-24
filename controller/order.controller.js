const { default: mongoose } = require("mongoose");
const { Products, User } = require("../db");

const newOrder = async (req, res)=>{
    const productId = req.params.productId;
    const email = req.headers.email;
    // const {quantity} = req.body;

    try {
        // const validProduct = new mongoose.Types.ObjectId(productId)
        const product = await Products.findById(productId);
        if(!product){
            return res.json({
                msg: "No product found"
            })
        }
        // const user = await User.findOne({
        //     email
        // })
        await User.findOneAndUpdate({
            email
        }, {
            $addToSet: {
                orderedItems: product._id
                
            }
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const updateOrder = async (req, res) => {

}

const deleteOrder = async (req, res) => {
    const productId = req.params.productId;
    const {email} = req.headers;

    try {
        const user = await User.findOneAndUpdate({
            email
        }, {
            $pull: {
                orderedItems: productId
            }
        })
        res.json({
            msg: "product cancled",
            product: productId
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const allOrders = async (req, res) => {
    const {email} = req.headers;

    try {
        const user = await User.findOne({
            email
        })

        const products = user.orderedItems

        res.json({
            Items: products
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = {
    newOrder,
    updateOrder,
    deleteOrder,
    allOrders
}