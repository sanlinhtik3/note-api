const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const { errorHandler } = require('./middleware/errorHandler')
const connectDB = require('./config/db')
const port = process.env.PORT || 8000



// MONGODB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/user', require('./routers/user.routes'))
app.use("/api/note", require("./routers/note.routes"));

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
})