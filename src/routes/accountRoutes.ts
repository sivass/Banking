import { Router } from "express";
import { AccountController } from "../controllers/accountController";
import { AccountService } from "../services/accountService";
import { authMiddleware } from "../middleware/authMiddleware";

const accountService = new AccountService();
const accountController = new AccountController(accountService);

const router = Router();

router.post('/', authMiddleware, accountController.createAccountController.bind(accountController));
router.get('/', authMiddleware, accountController.getAccountController.bind(accountController));

export default router;