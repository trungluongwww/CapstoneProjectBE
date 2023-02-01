import { Response } from "express"

export default (
    res:Response,
    message:string='Not found',
)=>{
    return res.status(404).json({message});
}