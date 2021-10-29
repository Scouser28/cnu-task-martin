import express from "express"
import {param, validationResult} from "express-validator"

import services from "../services"

const router = express.Router()

router.get('/', services.ingredients.getAllIngredients) 
    
router.get('/:id', param('id').isNumeric(), async (req, res) => {
    try{
        const validationResults = validationResult(req)
        if(validationResults.isEmpty()){
            const filteredIngredients = await req.context.models.ingredient.findAll({
                where: {id: req.params.id}
    })
    //throw new Error ('some bad stuff happened')
    res.send(filteredIngredients)
    } else {
        res.status(400)
        res.send('validation Error')
    }
    }catch(error) {
        console.log('error', error)
        res.sendStatus(500)
    }
})

export default router