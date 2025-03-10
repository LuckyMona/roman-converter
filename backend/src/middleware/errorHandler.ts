import { Request, Response, NextFunction } from 'express';

/**
 * Global error handler middleware
 */
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Unexpected error:', err);

  // When status code is not set, default to 500
  const statusCode = res.statusCode >= 400 ? res.statusCode : 500;

  res.status(statusCode).json({
    error: err?.message || 'Internal Server Error, Please try again after a while.',
  });
};

export default errorHandler;
