//const is used in ES5
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const connectDb = require('./config/config')
require('colors')
const path = require('path')
//dotenv config
dotenv.config()

//db config
connectDb()

//rest object
const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan('dev'))

//static files access
app.use(express.static(path.join(__dirname, './client/build')))

//routes
app.use('/api/items/', require('./routes/itemRoutes'))
app.use('/api/users/', require('./routes/userRoutes'))
app.use('/api/bills/', require('./routes/billsRoute'))

app.get('*', function(req,res){
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})

//PORT
const PORT = process.env.PORT || 8080

//listen
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`.bgCyan.white)
})