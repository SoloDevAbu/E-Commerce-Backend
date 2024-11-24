const { Products, User } = require("../db");

const addProductToCart = async (req, res) => {
    const productId = req.params.productId;
    const email = req.headers.email;
    // const quantity = req.body.quantity;

    try {
        const user = await User.findOneAndUpdate({
            email
        }, {
            $addToSet: {
                cartItems: productId
            }
        })

        // const cartItemIndex = user.cartItems.findIndex(item => item.productId.toString() === productId)
        // if (cartItemIndex > 0) {
        //     user.cartItems[cartItemIndex].quantity += quantity
        // } else {
        //     user.cartItems.push({
        //         productId,
        //         quantity
        //     })
        // }
        res.json({
            msg: "Product add successfully",
            products: user.cartItems
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
        const user = await User.findOne({
            email
        })
        const products = await Products.find({
            _id: {
                $in: user.cartItems
            }
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

//Implement this one latter
// const updateProductInCart = async (req, res) => {
//     const productId = req.params.productId;
//     const quantity = req.body.quantity;

//     try {
//         const updatedProduct = User.findOneAndUpdate(
//             productId, {
//         }, {
//             $in: {
//                 quantity: {
//                     quantity
//                 }
//             }
//         })
//         res.json({
//             msg: "Quantity Updated",
//             quantity
//         })
//     } catch (error) {
//         res.status(500).json({
//             error: error.message
//         })
//     }
// }

const removeProductFromCart = async (req, res) => {
    const productId = req.params.productId;
    const email = req.header.email;
    try {
        const user = await User.findOneAndUpdate({
            email
        }, {
            $pull: {
                cartItems: {
                    productId
                }
            }
        },
            { new: true }
        );

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
    // updateProductInCart,
    removeProductFromCart
}