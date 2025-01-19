import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import connectNoSql from './src/config/nosql/config'
import configRoutes from './src/routes/index'
import handleException from './src/middleware/handleException.middleware'
require('dotenv').config()

const app = express()

app.use(function (req, res, next) {
  const allowedOrigins = ['http://localhost:3024']
  const origin = req.headers.origin

  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization',
  )

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  )
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  next()
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(helmet())

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
// app.use(expressValidator())

app.use(cookieParser())

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

connectNoSql()

configRoutes(app)

app.use(handleException.notFoundHandler)
app.use(handleException.errorHandler)

module.exports = app
