import express from "express";
import { createUserDataController, getAllDataController, getUserByIdController, updateUserController } from "../controller/notescontroller.js";
const router = express.Router();


router.route("/notes/new").post(createUserDataController);
router.route("/notes/all").get(getAllDataController);
router.route("/user/id").post(getUserByIdController);
router.route("/user/update").post(updateUserController);
export default router;