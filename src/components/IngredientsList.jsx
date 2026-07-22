export default function IngredientsList(props){
    return(
        <>
            { props.ingredients.length > 0 ? <section>
                <h2>Ingredients on hand:</h2>
                <ul className="ingredients-list" aria-live="polite">{props.ingredientsList}</ul>
                {props.ingredients.length > 3 &&<div className="get-recipe-container">
                    <div>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button onClick={props.showRecipe}>Get a recipe</button>
                </div>}
            </section> :null
            }
        </>
    )
}