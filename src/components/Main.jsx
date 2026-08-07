import React from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromMistral } from "../ai.js";


export default function Main (){

    const [recipe, setRecipe] = React.useState("")

    

    const [ingredients, setIngredients] = React.useState(
        ["chicken", "all the main spices", "corn", "heavy cream", "pasta"]
    ) ;

    async function showRecipe(){
        
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipeShown (prevState => prevState = true)
        setRecipe(recipeMarkdown)
    
    }

    const [recipeShown, setRecipeShown] = React.useState (false);

    const recipeSection = React.useRef(null)
    
    React.useEffect(()=>{
       if ( recipe !== "" && recipeSection.current !== null){
            recipeSection.current.scrollIntoView({behavior: "smooth"})
       }  
    }, [recipe])
    



    



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
            <form action ={addIngredient}  >
                <input className="ingredient" type="text" name="ingredient" placeholder="e.g. oregano"></input>
                <button  className="add-button" type="submit">+ Add Ingredient</button>
            </form>


            <IngredientsList
                ingredients = {ingredients}
                ingredientsList={ingredientsList}
                showRecipe = {showRecipe}
                ref ={recipeSection}
            />

            {recipeShown && <ClaudeRecipe
                showRecipe ={recipe}
            />
            }
            
        </main>
        
    );

}