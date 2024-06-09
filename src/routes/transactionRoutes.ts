import { Router } from 'express';
import { TransactionController } from '../controllers/transactionController';
import { TransactionService } from '../services/transactionService';
import { AccountService } from '../services/accountService';
import { authMiddleware } from '../middleware/authMiddleware';

const accountService = new AccountService();
const transactionService = new TransactionService(accountService);
const transactionController = new TransactionController(transactionService);

const router = Router();

router.post('/', authMiddleware, transactionController.createTransactionController.bind(transactionController));
router.get('/:accountId', authMiddleware, transactionController.getTransactionController.bind(transactionController));

export default router;