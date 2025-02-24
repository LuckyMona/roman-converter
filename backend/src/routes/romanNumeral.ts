import express, { Request, Response, Router } from 'express';
import { convertToRoman } from '../utils/converter';

const router: Router = express.Router();

router.get('/romannumeral', (req: Request, res: Response) => {
  const query = req.query.query as string;
  const num = parseInt(query);

  if (isNaN(num) || num < 1 || num > 3999) {
    return res.status(400).send('Error: inputs must be the integer between 1 and 3999');
  }

  // Mock loading delay
  setTimeout(() => {
    const output = convertToRoman(num);
    res.json({ input: query, output });
  }, 500);  // delay
});

export default router;
