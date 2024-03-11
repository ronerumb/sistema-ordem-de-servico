import { Router } from "express";
import { userController } from "./controller/UserController";




const router: Router = Router();



const baseUrl = '/user';

router.post(`${baseUrl}`,userController.create);
router.put(`${baseUrl}`,userController.update);
router.delete(`${baseUrl}`,userController.delete);


export const userRouter = router;