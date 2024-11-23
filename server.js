const express = require("express");
const app = express();

const userRouter = require("./routes/user.route");
const AdminRouter = require("./routes/admin.route")
const productRouter = require("./routes/product.route");
const cartRouter = require("./routes/cart.route");
const orderRouter = require("./routes/order.route");


app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);



app.listen(3000);