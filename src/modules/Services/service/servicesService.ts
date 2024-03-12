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

    public async update(name: string,description: string,price:number){
        const findService = await prismaConnect.services.findMany({
            where: {
                name,
            }
        });

        if (findService){
            throw new Error('Serviço não encontrado')
        }

        const update = await prismaConnect.services.update({
            where: {
                name,
            },
            data: {
                name: name,
                description :description,
                price : price
                
            }
        })

        return update;

       

            
    }

    public async delete( name: string) {
        const findService = await prismaConnect.services.findUnique({
            where : {
                name,
            }
        })

        if (!findService) {
            throw new Error('Serviço não cadastrado')

        }

        const delet = await prismaConnect.services.delete({
            where:{
                name,
            }
        })
        return delet;
    }

}

export const servicesService = new ServicesService();