import React from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromMistral } from "../ai.js";


export default function Main (){

    const [recipe, setRecipe] = React.useState("")

    

    const [ingredients, setIngredients] = React.useState(
        []
    ) ;

    async function showRecipe(){
        
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipeShown (prevState => prevState = true)
        setRecipe(recipeMarkdown)
    
    }

    const [recipeShown, setRecipeShown] = React.useState (false);


    



    



    function addIngredient (formData){
        const newIngredient = formData.get("ingredient");
        setIngredients(prevIngredients => [...ingredients,newIngredient]);
    }

    const ingredientsList = ingredients.map((ingredient) =>{
        return(
            <li key ={ingredient}>{ingredient}</li>
        );
    })
    return(
        <main>
            <form action ={addIngredient} method = "POST" >
                <input className="ingredient" type="text" name="ingredient" placeholder="e.g. oregano"></input>
                <button  className="add-button" type="submit">+ Add Ingredient</button>
            </form>


            <IngredientsList
                ingredients = {ingredients}
                ingredientsList={ingredientsList}
                showRecipe = {showRecipe}
            />

            <ClaudeRecipe
                recipeShown = {recipeShown}
                showRecipe ={recipe}
            />

            
        </main>
        
    );

}