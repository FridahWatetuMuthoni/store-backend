import { Router } from "express";
import product_router from "./products.js";

const router = Router();

router.use(product_router);

export default router;
