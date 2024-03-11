import { Request, Response } from "express";
import {z} from 'zod';
import { servicesService } from "../service/servicesService";


class ServicesController{


    public async create(req:Request, res: Response){
        const {name,description,price} = req.body;

        try {
            const validator = z.object({
                name : z.string().min(1,{message : 'Nome é obrigatorio'}),  
                email : z.string().min(1,{message : 'Descrição é obrigatorio'}) 
               
            });
            validator.parse({name,description});
            
        } catch (err:any) {
            return res.status(400).json({
                message : err.errors
            })
            
        }

        try {
            return res.json({
                message : 'Incluido com sucesso',
                data : await servicesService.create(name,description,price),
            })
            
        } catch (error) {
            
        }

        
    }
}