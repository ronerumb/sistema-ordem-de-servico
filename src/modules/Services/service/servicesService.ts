import { prismaConnect } from "prismaConn";



class ServicesService{

    public async create(name: string,description: string,price:number){
        const findService = await prismaConnect.services.findMany({
            where: {
                name,
            }
        });

        if (findService){
            throw new Error('Serviço já cadastrado')
        }

        const create = await prismaConnect.services.create({
            data: {
                name,
                description,
                price,
            }, select :{
                name:true,
                description:true,
                price:true,
            }
        })

        return create;

       

            
    }

}

export const servicesService = new ServicesService();