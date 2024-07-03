import type { NextFunction, Request, Response } from 'express';
import { statsSchema } from '../schemas/statsSchema';
import { ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';

/**
 * Use the statsSchema and zod to validate the incoming walking data
 */
export const validateStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    statsSchema.parse(req.body);
    next();
  } catch (error) {
    console.log('Error:', error);
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map((issue) => ({
        message: `${issue.path.join('.')} is ${issue.message}`,
      }));
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Invalid data', details: errorMessages });
    } else {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error' });
    }
  }
};
