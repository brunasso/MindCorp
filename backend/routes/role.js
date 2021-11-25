import express from 'express';
import role from '../controllers/role.js';

const router = express.Router();

router.post('/registerRole', role.registerRole);
/* router.post('/updateUser', role.updateUser);
router.get('/listUser', role.listUser);
router.delete('/deleteUser', role.deleteUser); */

export default router;