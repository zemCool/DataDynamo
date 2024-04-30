const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const userRouter = require('./routers/user-router')
const errorMiddleware = require('./middlewares/error-middleware');

const { configDotenv } = require('dotenv')

configDotenv();

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: '*'
}));

app.use('/api', userRouter);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    app.listen(PORT, () => console.log('server started on port:', PORT))
  } catch (err) {
    console.log(err)
  }
}

start()