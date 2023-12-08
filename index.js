const express = require('express');
const cors = require('cors');
require('dotenv').config();
const rateLimit = require('express-rate-limit')

//need to do: send playlist id to api

const PORT = process.env.PORT || 80

const app = express()

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 50
})

app.use(limiter)
app.set('trust proxy', 1)

app.use(cors())

app.use('/api', require('./routes/index'))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))