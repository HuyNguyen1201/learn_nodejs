const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const {logEvents,logger} = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const corsOptions = require('./config/corsOptions')
const verifyJWT = require('./middleware/verifyJWT')
const credentials = require('./middleware/credentials')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
require('dotenv').config()

// connect to MongoDB
connectDB()

const PORT = process.env.PORT || 3500
app.use(logger)

app.use(credentials)
app.use(cors(corsOptions))

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())

app.use(express.static(path.join(__dirname,'/public')))


app.use('/',require('./routes/root'))
app.use('/register',require('./routes/register'))
app.use('/auth',require('./routes/auth'))
app.use('/refresh',require('./routes/refresh'))
app.use('/logout',require('./routes/logout'))
app.use(verifyJWT)
app.use('/api/employees',require('./routes/api/employees'))

app.get('/*',(req, res)=>{
    // res.send('Hello World')
    res.status(404)
    if (req.accepts('html')){
        res.sendFile('./views/404.html',{root: __dirname})
    }else if (req.accepts("json")){
        res.json({error: "404 Not Found"})
    } else {
        res.type('txt').send("404 Not Found")
    }
})

app.use(errorHandler)

mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB')
    app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`))
})

