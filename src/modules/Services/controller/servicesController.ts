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
            
        } catch (err:any) {
            return res.status(400).json({
                error: err.message,
            })
            
        }

        
    }

        public async update(req:Request, res: Response){
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
                message : 'Atualizado com sucesso',
                data : await servicesService.update(name,description,price),
            })
            
        } catch (err:any) {
            return res.status(400).json({
                message : err.errors
            })
        }

        
    }

    public async delete (req:Request, res:Response){
        const name = req.body.email;

        try {
            const validator = z.string().min(1,{message: 'Email é obrigatorio'} )
            validator.parse(name);
            
        } catch (err:any) {
            res.status(400).json({
                error:err.message,
            })
            
        }

        try {
            res.status(200).json({
                message: 'Excluido com sucesso',
                date: await servicesService.delete(name),
            })
        } catch (err:any) {
            return res.status(400).json({
                message : err.errors
            })
        }
    }
}