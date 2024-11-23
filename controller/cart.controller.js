const { Products, User } = require("../db");

const addProductToCart = async (req, res) => {
    const productId = req.params.productId;
    const email = req.headers.email;
    const quantity = req.body.quantity;

    try {
        const addProductToCart = await User.findOneAndUpdate({
            email
        }, {
            $addToSet: {
                cartItems: productId,
                quantity: {
                    quantity
                }
            }
        })
        res.json({
            msg: "Product add successfully",
            addProductToCart
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const allProductInCart = async (req, res) => {
    const email = req.headers.email;
    try {
        const products = await Products.find({
            email
        }, {
            $in: User.cartItems
        })
        res.json({
            products
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const updateProductInCart = async (req, res) => {
    const productId = req.params.productId;
    const quantity = req.body.quantity;

    try {
        const updatedProduct = User.findOneAndUpdate(
            productId,{
        }, {
            $in: {
                quantity: {
                    quantity
                }
            }
        })
        res.json({
            msg: "Quantity Updated",
            quantity
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const removeProductFromCart = async (req, res) => {
    const productId = req.params.productId;
    try {
        const product = await User.findOneAndUpdate(productId, {
            $pull: {
                productId
            }
        })
        res.json({
            msg: "Product removed from cart successfully"
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = {
    addProductToCart,
    allProductInCart,
    updateProductInCart,
    removeProductFromCart
}