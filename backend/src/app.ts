import express from 'express'
import cors from 'cors'
import romanNumeralRouter from './routes/romanNumeral'
import client from 'prom-client'
import morgan from 'morgan'
import winston from 'winston'

const app = express()

app.use(cors())

app.use(express.json())

// Metrics Setup
const collectDefaultMetrics = client.collectDefaultMetrics
collectDefaultMetrics()

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType)
  res.end(await client.register.metrics())
})

// Logging Setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})
app.use(morgan('combined', { stream: { write: msg => logger.info(msg.trim()) } }))

app.use('/', romanNumeralRouter)

export default app
