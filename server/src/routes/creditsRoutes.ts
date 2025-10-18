import express from "express";
import { getPlans, purchaseCredits } from "../controllers/creditsController.js";
import { protect } from "../middleware/auth.js";

const creditsRoutes = express.Router();

creditsRoutes.get("/plans", getPlans);
creditsRoutes.post("/purchase", protect, purchaseCredits);

export default creditsRoutes;