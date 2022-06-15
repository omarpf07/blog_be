import userController from "../controllers/user-controller";
import express from "express";
let router = express.Router();

router.post("/register", userController.create);
router.get("/login", userController.login);

export default router;
