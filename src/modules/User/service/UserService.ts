
import { prismaConnect } from "prismaConn";




class UserService {

    public async create(name: string, email: string, password: string) {
        
        const findUser = await prismaConnect.user.findUnique({
            where: {
                email,
            }
        });

        if (findUser) {
            throw new Error('Usuario já cadastrado')

        }



        const create = await prismaConnect.user.create({
            data: {
                name,
                email,
                password
            },
            select: {
                name: true,
                email: true
            }
        })

        return create;

    }

    public async update (name: string, email: string , password : string){
        const findUser = await prismaConnect.user.findUnique({
            where : {
                email,
            }
        })

        if (!findUser) {
            throw new Error('Email não cadastrado')

        }

        const update = await prismaConnect.user.update({
            where: {
                email,
            },
            data: {
                name: name,
                password: password,
                
            }

        })

        return update;
    }

    public async delete( email: string) {
        const findUser = await prismaConnect.user.findUnique({
            where : {
                email,
            }
        })

        if (!findUser) {
            throw new Error('Email não cadastrado')

        }

        const delet = await prismaConnect.user.delete({
            where:{
                email,
            }
        })
        return delet;
    }

}

export const userService = new UserService(); 