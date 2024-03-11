import { Request, Response } from 'express';
import {z} from 'zod';
import { clientService } from '../service/ClientService';

class ClientController{

    

    public async create(req : Request, res: Response){
        const { email,name,adress,telephone} = req.body;      

        try {
            const validator = z.object({
                name : z.string().min(1,{message : 'Nome é obrigatorio'}),  
                email : z.string().email({message : 'Email é obrigatorio'}),   
                adress : z.string().min(1,{message : 'Endereço é obrigatorio'}),     
                telephone : z.string().min(1,{message : 'Telefone é obrigatorio'})
            });
            validator.parse({name,email,adress,telephone});
            
        } catch (err:any) {
            return res.status(400).json({
                message : err.errors
            })
            
        }

        try {
            
            return res.json({
                message : 'Incluido com sucesso',
                data : await clientService.create(email,name,adress,telephone),
            })
            
        } catch (err:any) {
            return res.status(400).json({
                error: err.message,
            })
            
        }
    }

    public async update(req : Request, res:Response){
        const { email,name,adress,telephone} = req.body;      

        try {
            const validator = z.object({
                name : z.string().min(1,{message : 'Nome é obrigatorio'}),   
                email : z.string().email({message : 'Email é obrigatorio'}),             
                telephone : z.string().min(1,{message : 'Telefone é obrigatorio'})
            });
            validator.parse({name,email,telephone});
            
        } catch (err:any) {
            return res.status(400).json({
                error : err.errors
            })
            
        }

        
        try {
            return res.status(200).json({
                message:'Atualizado com sucesso',
                data : await clientService.update(email,name,adress,telephone),
            })
            
        } catch (err:any) {
            return res.status(400).json({
                error: err.message,
            })
        }
    }

    public async delete (req:Request, res:Response){
        const email = req.body.email;

        try {
            const validator = z.string().email({message : 'Email é obrigatorio'})
            validator.parse(email);
            
        } catch (err:any) {
            res.status(400).json({
                error:err.message,
            })
            
        }

        try {
            res.status(200).json({
                message: 'Excluido com sucesso',
                date: await clientService.delete(email),
            })
        } catch (error) {
            
        }
    }
}

export const clientController = new ClientController();