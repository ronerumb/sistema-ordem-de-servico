import { Request, Response } from 'express';
import {z} from 'zod';
import { userService } from '../service/UserService';

class UserController{

    public async create(req : Request, res: Response){
        const {name,email,password} = req.body;      

        try {
            const validator = z.object({
                name : z.string().min(1,{message : 'Nome é obrigatorio'}),
                email : z.string().email({message : 'Email é obrigatorio'}),
                password : z.string().min(5,'Senha é obrigatoria')
            });
            validator.parse({name,email,password});
            
        } catch (err:any) {
            return res.status(400).json({
                error : err.errors
            })
            
        }

        try {
            
            return res.json({
                message : 'Incluido com sucesso',
                data : await userService.create(name,email,password),
            })
            
        } catch (err:any) {
            return res.status(400).json({
                error: err.message,
            })
            
        }
    }

    public async update(req : Request, res:Response){
        const {name,email,password} = req.body;

        try {
            const validator = z.object({
                name : z.string().min(1,{message : 'Nome é obrigatorio'}),
                email : z.string().email({message : 'Email é obrigatorio'}),
                password : z.string().min(5,'Senha é obrigatoria')
            });
            validator.parse({name,email,password});
            
        } catch (err:any) {
            return res.status(400).json({
                error : err.errors
            })
            
        }
        
        try {
            return res.status(200).json({
                message:'Atualizado com sucesso',
                data : await userService.update(name,email,password),
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
                date: await userService.delete(email),
            })
        } catch (error) {
            
        }
    }
}

export const userController = new UserController();