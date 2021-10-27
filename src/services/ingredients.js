
async function getAllIngredients (req, res) {
    try{
    const ingredients = await req.context.models.ingredient.findAll(
    )
    //throw new Error ('some bad stuff happened')
    res.send(ingredients)
    } catch(error) {
        console.log('error', error)
        res.sendStatus(500)
    }
}

export default { getAllIngredients }