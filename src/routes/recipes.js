import express from "express";
import { param, validationResult } from "express-validator";

import services from "../services";

const router = express.Router();

router.get("/", services.recipes.getAllRecipes);

router.get(
  "/:title",
  param("title").isLength({ min: 2, max: 50 }),
  services.recipes.getRecipe
);

router.delete("/:id", param("id").isNumeric(), services.recipes.removeRecipe);

router.post("/", services.recipes.addRecipe);

export default router;
