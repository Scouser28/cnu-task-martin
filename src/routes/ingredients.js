import express from "express";
import { param } from "express-validator";

import services from "../services";

const router = express.Router();

router.get("/", services.ingredients.getAllIngredients);

router.get("/:id", param("id").isNumeric(), services.ingredients.getIngredient);

router.post("/", services.ingredients.addIngredients);

router.delete(
  "/:id",
  param("id").isNumeric(),
  services.ingredients.removeIngredient
);

export default router;
