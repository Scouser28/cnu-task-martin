import { param, validationResult } from "express-validator";

async function getAllRecipes(req, res) {
  try {
    const recipes = await req.context.models.recipe.findAll({
      include: [{ model: req.context.models.ingredient }],
    });
    //throw new Error ('some bad stuff happened')
    res.send(recipes);
  } catch (error) {
    req.log.error(error);
    res.sendStatus(500);
  }
}

async function getRecipe(req, res) {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const filteredRecipes = await req.context.models.recipe.findAll({
        where: { title: req.params.title },
        include: [{ model: req.context.models.ingredient }],
      });
      //throw new Error ('some bad stuff happened')
      res.send(filteredRecipes);
    } else {
      req.log.info(`validation error value: ${req.params.tittle}`);
      res.status(400);
      res.send("validation Error");
    }
  } catch (error) {
    req.log.error(error);
    res.sendStatus(500);
  }
}

async function addRecipe(req, res) {
  try {
    const validationResults = validationResult(req);
    if (validationResults.isEmpty()) {
      await req.context.models.recipe.create(
        {
          title: req.body.title,
          text: req.body.text,
          ingredients: req.body.ingredients,
        },
        { include: [{ model: req.context.models.ingredient }] }
      );
      //throw new Error ('some bad stuff happened')
      res.send(`Recipe ${req.body.title} has been added.`);
    } else {
      res.status(400);
      res.send("validation Error");
    }
  } catch (error) {
    console.log("error", error);
    res.sendStatus(500);
  }
}

async function removeRecipe(req, res) {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      await req.context.models.recipe.destroy({
        where: { id: req.params.id },
        include: [{ model: req.context.models.ingredient }],
      });
      //throw new Error ('some bad stuff happened')
      res.send(`Recipe number ${req.params.id} has been deleted.`);
    } else {
      req.log.info(`validation error value: ${req.params.id}`);
      res.status(400);
      res.send("validation Error");
    }
  } catch (error) {
    req.log.error(error);
    res.sendStatus(500);
  }
}

export default { getAllRecipes, getRecipe, addRecipe, removeRecipe };
