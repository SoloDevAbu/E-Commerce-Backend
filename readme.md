E-Commerce Backend
A fully functional backend API for an e-commerce platform where users can:

Browse products.
Add products to a shopping cart.
Place orders and manage them.
Manage user accounts (admin and customer roles).
Admin can manage products and view orders.
Features
User Management
User authentication and authorization (JWT-based).
Role-based access for Admin and Customer.
Product Management
Admin can add, update, and delete products.
Customers can view the product catalog.
Shopping Cart
Add, update, and remove items from the cart.
Persist cart state for users.
Order Management
Place orders from the cart.
Admin can view and manage all orders.
Payment Integration (Future Scope)
Placeholder for integrating a payment gateway.
Tech Stack
Backend Framework: Node.js with Express.js
Database: MongoDB
Authentication: JWT
Validation: Zod
Encryption: bcrypt for password hashing
Installation and Setup
1. Clone the Repository
git clone https://github.com/SoloDevAbu/E-Commerce-Backend.git
cd ecommerce-backend

2. Install Dependencies
npm install

3. Set Up Environment Variables
Create a .env file in the root directory with the following:

makefile
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

4. Run the Server
npm start

API Endpoints
1. User Routes
HTTP Method	Endpoint	Description	Access
POST	/api/users/register	Register a new user	Public
POST	/api/users/login	Log in a user	Public
GET	/api/users/profile	Get user profile	Private
PUT	/api/users/profile	Update user profile	Private
2. Product Routes
HTTP Method	Endpoint	Description	Access
GET	/api/products	Get all products	Public
POST	/api/products	Create a new product	Admin
PUT	/api/products/:id	Update a product by ID	Admin
DELETE	/api/products/:id	Delete a product by ID	Admin
3. Cart Routes
HTTP Method	Endpoint	Description	Access
POST	/api/cart	Add an item to the cart	Private
GET	/api/cart	Get items in the cart	Private
PUT	/api/cart/:itemId	Update quantity of an item in cart	Private
DELETE	/api/cart/:itemId	Remove an item from the cart	Private
4. Order Routes
HTTP Method	Endpoint	Description	Access
POST	/api/orders	Place a new order	Private
GET	/api/orders	Get all user orders	Private
GET	/api/orders/all	Admin: Get all orders	Admin
Database Models
1. User Model
Field	Type	Description
name	String	User's full name
email	String	Unique email address
password	String	Hashed password
role	String (enum)	Either "customer" or "admin"
2. Product Model
Field	Type	Description
name	String	Name of the product
description	String	Product details
price	Number	Price of the product
stock	Number	Available stock count
image	String	URL of the product image
3. Cart Model
Field	Type	Description
user	ObjectId (ref: User)	User who owns the cart
items	Array of Objects	List of product items
totalPrice	Number	Total price of items in the cart
4. Order Model
Field	Type	Description
user	ObjectId (ref: User)	User who placed the order
items	Array of Objects	List of products in the order
totalPrice	Number	Total cost of the order
status	String (enum)	"Pending", "Shipped", "Delivered"
Future Enhancements
Integrate a payment gateway like Stripe or Razorpay.
Add product reviews and ratings.
Implement a wishlist feature.
Add search and filter functionality for products.
Build real-time inventory management.
Contributing
Fork the repository.
Create a new branch for your feature/bug fix.
Commit your changes and submit a pull request.
License
This project is open-source and available under the MIT License.

This README ensures that anyone working on this project knows the requirements, structure, and development process clearly.
