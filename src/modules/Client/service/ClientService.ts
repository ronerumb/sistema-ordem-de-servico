
import { prismaConnect } from "prismaConn";




class ClientService {

    public async create(email: string, name : string, adress :string, telephone :string) {
        
        const findUser = await prismaConnect.client.findUnique({
            where: {
                email,
            }
        });

        if (findUser) {
            throw new Error('Cliente já cadastrado')

        }



        const create = await prismaConnect.client.create({
            data: {
                email, name , adress, telephone
                
            },
            select: {
                name: true,
                email: true
            }
        })

        return create;

    }

    public async update (email: string, name : string, adress :string, telephone :string){
        const findUser = await prismaConnect.client.findUnique({
            where : {
                email,
            }
        })

        if (!findUser) {
            throw new Error('Email não cadastrado')

        }

        const update = await prismaConnect.client.update({
            where: {
                email,
            },
            data: {
                name: name,
                adress :adress,
                telephone : telephone
                
            }

        })

        return update;
    }

    public async delete( email: string) {
        const findUser = await prismaConnect.client.findUnique({
            where : {
                email,
            }
        })

        if (!findUser) {
            throw new Error('Email não cadastrado')

        }

        const delet = await prismaConnect.client.delete({
            where:{
                email,
            }
        })
        return delet;
    }

}

export const clientService = new ClientService(); 