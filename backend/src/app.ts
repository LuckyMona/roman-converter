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

// Histogram for HTTP request duration
const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 1, 1.5, 2, 3, 5, 10]
})

// HTTP request counts
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
})

// Middleware: Collect metrics for each HTTP request
app.use((req, res, next) => {
  const end = httpRequestDurationMicroseconds.startTimer()
  res.on('finish', () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      status_code: res.statusCode
    })
    end({ method: req.method, route: req.route ? req.route.path : req.path, status_code: res.statusCode })
  })
  next()
})

// Metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType)
  res.end(await client.register.metrics())
})

// Logging Setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
})

app.use(morgan('combined', { stream: { write: msg => logger.info(msg.trim()) } }))

app.use('/', romanNumeralRouter)

export default app
