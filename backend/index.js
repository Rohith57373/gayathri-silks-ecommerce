const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors = require("cors");
const cloudinary = require('../backend/cloudinary/cloudinary');

require('dotenv').config()

//  middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))


// routes
const bookRoutes = require('./src/books/book.route')
const orderRoutes = require('./src/orders/order.route')
const userRoutes = require('./src/users/user.route')
const adminRoutes = require("./src/stats/admin.stats")
const cloudinaryRoutes = require("../backend/cloudinary/cloudinary_route")

app.use("/api/books", bookRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/cloud", cloudinaryRoutes)




// mongoose username and password 
//  rohith57878
//  nPkBRlYZE37CtaTk;
const User = require('./src/users/users.model');
const mongoose = require('mongoose');

async function main() {
    await mongoose.connect(process.env.DB_URL);
    app.get('/', (req, res) => {
        res.send('hello world !')
    })
}

main().then(() => console.log("mongodb connected succesfully !")).catch(err => console.log(err))

app.listen(port, () => {
    console.log(`example app listening on port ${port}`)
})