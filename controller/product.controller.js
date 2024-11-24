const zod = require("zod");
const { Products, Admin } = require("../db");

const ProductSchema = zod.object({
    title: zod.string(),
    description: zod.string(),
    price: zod.number(),
    stock: zod.number(),
    category: zod.string(),
    image: zod.string(),
    tags: zod.string(),
})

const getAllProduct = async (req, res) => {
    const {title, category} = req.body;

    try {
        const product = await Products.find({
            title,
            category
        })
        res.json({
            product
        })
    } catch (error) {
        res.json({
            msg: "something is wrong with the server"
        })
    }
}

const createNewProduct = async (req, res) => {
    const validation = ProductSchema.safeParse(req.body);
    const {email} = req.headers;
    if(!validation.success){
        return res.status(403).json({
            msg: "make sure everything is given as expected",
            errors: validation.error.errors
        })
    }
    
    const {title, description, price, stock, category, image, tags} = validation.data

    try {
        
        const product = await Products.create({
            title,
            description,
            price,
            stock,
            category,
            image,
            tags
        })
        const admin = await Admin.findOneAndUpdate({
            email
        }, {
            $addToSet:{
                products: product._id
            }
        })
        res.json({
            msg: "Product created successfully"
        })
        
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const updateProductById = async (req, res) => {
    const productId = req.params.productId;
    const {title, description, price, stock, category, image, tags} = req.body

    try {
        const updatedProduct = await Products.findByIdAndUpdate(productId, {
            $addToSet: {
                title,
                description,
                price,
                stock,
                category,
                image,
                tags
            }
        })
        res.json({
            msg: "Updated successfully",
            updatedProduct
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const deleteProductById = async (req, res) => {
    const productId = req.params.productId;
    const {email} = req.headers;

    try {
        const product = await Products.findByIdAndDelete(productId)
        res.json({
            msg: `Product deleted ${product}`
        })
        await Admin.findOneAndUpdate({
            email,
        }, {
            $pull: {
                products: product._id
            }
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = {
    getAllProduct,
    createNewProduct,
    updateProductById,
    deleteProductById
}