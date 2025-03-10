import express, { Request, Response, Router } from 'express'
import { convertToRoman } from '../utils/converter'

const router: Router = express.Router()

/**
 * @route GET /romannumeral
 * @description Convert an integer (1-3999) to a Roman numeral
 * @queryParam {string} query - The number to be converted, must be between 1 and 3999.
 * @returns { input: string, output: string }
 *
 * @response 200 { input: string, output: string } - Successful conversion
 * @response 400 { error: string } - Bad request (invalid or missing query parameter)
 * @response 405 { error: string } - Method not allowed (if using non-GET methods)
 * @response 429 { error: string } - Too many requests (rate limiting)
 * @response 501 { error: string } - Not implemented (if using non-GET methods)
 * @response 500 { error: string } - Internal server error (unexpected failure)
 *
 * @example
 * GET /romannumeral?query=12
 * Response: { "input": "12", "output": "XII" }
 */
router.get('/romannumeral', (req: Request, res: Response) => {
  const query = req.query.query as string
  if (!query) {
    return res.status(400).send({ error: 'Please enter a number between 1 and 3999 (no decimals).' })
  }

  // query param is not a valid integer
  const num = parseInt(query)
  if (/^[1-9]\d*$/gi.test(query) === false || isNaN(num)) {
    return res.status(400).json({ error: 'Please enter a number between 1 and 3999 (no decimals).' })
  }

  // query param is not within the valid range
  if (num < 1 || num > 3999) {
    return res.status(400).json({ error: 'Please enter a number between 1 and 3999 (no decimals).' })
  }

  setTimeout(() => {
    try {
      // If convertToRoman throws, we catch it here
      const output = convertToRoman(num);
      res.json({ input: query, output });
    } catch (error: any) {
      // Send a 500 response so Supertest doesn't hang
      res.status(500).json({ error: error.message });
    }
  }, 500);
})

// Handle non-GET requests
router.all('/romannumeral', (req: Request, res: Response) => {
  res.status(405).json({ error: 'Method Not Allowed' })
})

export default router
