const express = require("express")
const app = express()
const dotEnv = require("dotenv")
const mongoose = require("mongoose") ;
const vendorRoutes = require('./routes/vendorRoutes')
const bodyParser = require('body-parser')
const firmRoutes = require('./routes/firmRoutes')
const productRoutes = require('./routes/productRoutes')
const path = require('path')
const cors = require('cors')


app.use(cors());

const PORT = process.env.PORT || 4000

dotEnv.config() 

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB connected successfully"))
.catch((error)=> console.log(error))

app.use(bodyParser.json()) // used to convert data came from input to json format
app.use("/vendor", vendorRoutes) //to create http request
app.use("/firm", firmRoutes)
app.use('/product', productRoutes)
app.use('/uploads', express.static('uploads')) //express.static takes a directory path from its arguments, in this case it is uploads folder

app.listen(PORT, () => {
    console.log(`Server started and running at ${PORT}`)
})

app.use("/", (req,res) => {
    res.send("Welcome to Swiggy !!")
})
