import express from 'express';
import user from '../controllers/user.js';

const router = express.Router();

router.post('/registerUser', user.registerUser);
router.post('/loginUser', user.loginUser);
router.post('/updateUser', user.updateUser);
router.get('/listUser', user.listUser);
router.delete('/deleteUser', user.deleteUser);

export default router;