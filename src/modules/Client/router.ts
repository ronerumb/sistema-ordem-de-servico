import { Router } from "express";

import { clientController } from "./controller/ClientController";




const router: Router = Router();



const baseUrl = '/client';

router.post(`${baseUrl}`,clientController.create);
router.put(`${baseUrl}`,clientController.update);
router.delete(`${baseUrl}`,clientController.delete);


export const clientRouter = router;