import { Router } from "express";
import { createMessage,getAllMessages } from "../controller/messageController";

const router: Router = Router();

router.post("/", createMessage);
router.get("/:id",getAllMessages)

export default router;
