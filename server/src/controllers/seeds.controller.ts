import {NextFunction, Request, Response} from "express";
import {SeedsService} from "../services/seeds.service";
import {StatusCodes} from "http-status-codes";


const getSeedsHandler = async(req:Request,res:Response,next:NextFunction) => {
    try{
        const seeds = await SeedsService.getSeeds()
        return res.status(StatusCodes.OK).send(seeds);
    }catch(e){
        next(e);
    }
}

export const SeedsController = {
    getSeedsHandler
}