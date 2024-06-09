import { Request, Response } from "express";
import { UserService } from "../services/userService";

export class UserController {
    constructor(private userService: UserService) {}

    async registerUserController(req: Request, res: Response): Promise<void>{
        try {
           const { firstName, lastName, email, password } = req.body;
           const user = await this.userService.registerUser(firstName, lastName, email, password);
           res.status(201).json({ user});
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error'});
        }
    }

    async loginUserController(req: Request, res: Response): Promise<void>{
        try {
            const { email, password} = req.body;
            const result = await this.userService.loginUser(email, password);
            res.status(200).json(result);
        } catch (error:any) {
            res.status(400).json({ message: error.message });
        }
    }
}