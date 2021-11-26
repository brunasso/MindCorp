import express from "express";
import board from "../controllers/board.js";
import auth from '../middlewares/auth.js';
const router = express.Router();

router.post("/saveTask", auth, board.saveTask);
router.get("/listTask", auth, board.listTask);
router.put("/updateTask", auth, board.updateTask);
router.delete("/deleteTask/:_id", auth, board.deleteTask);

export default router;
