import {NextFunction, Request, Response} from "express";
import {CustomError} from "../models/error.models";
import {StatusCodes} from "http-status-codes";


export const ErrorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        return res.status(err.status).send({code: err.status, message: `${err.name} : ${err.message}`})
    } else {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: `${err.name} : ${err.message}`
        })
    }
}