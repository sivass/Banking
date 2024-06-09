import { Router } from "express";
import { UserController } from "../controllers/userController";
import { UserService } from "../services/userService";

const userService = new UserService();
const userController = new UserController(userService);

const router = Router();

router.post('/register', userController.registerUserController.bind(userController));
router.post('/login', userController.loginUserController.bind(userController));

export default router;