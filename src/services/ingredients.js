import { param, validationResult } from "express-validator";

async function getAllIngredients(req, res) {
  try {
    const ingredients = await req.context.models.ingredient.findAll();
    res.send(ingredients);
  } catch (error) {
    console.log("error", error);
    res.sendStatus(500);
  }
}

async function getIngredient(req, res) {
  try {
    const validationResults = validationResult(req);
    if (validationResults.isEmpty()) {
      const filteredIngredients = await req.context.models.ingredient.findAll({
        where: { id: req.params.id },
      });
      res.send(filteredIngredients);
    } else {
      res.status(400);
      res.send("validation Error");
    }
  } catch (error) {
    console.log("error", error);
    res.sendStatus(500);
  }
}

async function addIngredients(req, res) {
  try {
    const validationResults = validationResult(req);
    if (validationResults.isEmpty()) {
      console.log(await req.body);
      await req.context.models.ingredient.bulkCreate(req.body);
      const ingredients = await req.context.models.ingredient.findAll();
      res.send(ingredients);
    } else {
      res.status(400);
      res.send("validation Error");
    }
  } catch (error) {
    console.log("error", error);
    res.sendStatus(500);
  }
}

async function removeIngredient(req, res) {
  try {
    const validationResults = validationResult(req);
    if (validationResults.isEmpty()) {
      await req.context.models.ingredient.destroy({
        where: { id: req.params.id },
      });
      res.send(`Ingredient number ${req.params.id} has been deleted.`);
    } else {
      res.status(400);
      res.send("validation Error");
    }
  } catch (error) {
    console.log("error", error);
    res.sendStatus(500);
  }
}

export default {
  getAllIngredients,
  getIngredient,
  addIngredients,
  removeIngredient,
};
