import {StatusCodes} from "http-status-codes";


export interface ICustomError extends Error{
    status:number;

}

export class CustomError extends Error{
    status:number;
    constructor(status:number,message:string,name?:string) {
        super(message);
        this.status = status;
        this.name = name ?? "Error"
    }
}



export class NotFoundError extends CustomError{
    constructor(message:string) {
        super(StatusCodes.NOT_FOUND,message,"Not Found");
    }

}