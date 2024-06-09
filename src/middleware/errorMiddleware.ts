import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
    console.error(err);
    if(err.name === 'ValidationError'){
        res.status(400).json({ message: err.message });
    } else if(err.name === 'UnauthorizedError'){
        res.status(401).json({ message: 'Unauthorized' });
    } else {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}