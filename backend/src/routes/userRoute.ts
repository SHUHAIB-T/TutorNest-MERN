import { Router } from "express";
import { sayHai } from "../controller/userController";

const router: Router = Router();

router.get("/", sayHai);

export default router;
