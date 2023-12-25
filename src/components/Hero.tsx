import Stack from "@mui/material/Stack"
import { LinearProgress } from "@mui/material"
import SearchBar from "@/components/SearchComponent/SearchBar"
import Heading from "@components/Heading"
import { useState } from "react"
import { Recipe, Ingredient } from "@/utils/types"

export default function Hero() {

    function changeQuantity (quantity: number) {
        const newRecipe = recipe;
        newRecipe.ingredients.forEach(ingredient => {
            ingredient.quantity = ingredient.quantity * quantity;
        })
        return newRecipe;
    }
    // recipe fields:
    // ingredients: Ingredient[];

    const [recipe, setRecipe] = useState<Recipe>({
        ingredients: [],
        changeQuantity: changeQuantity
    });

    const [loading, setLoading] = useState<boolean>(false);

    return (
        <Stack
            direction={"column"}>
            <Heading />
            <div 
                className="center"
            >
                <SearchBar recipe={recipe} setRecipe={setRecipe} setLoading={setLoading}/>
            </div>
            {loading && <LinearProgress />}
            {recipe.ingredients.length > 0 &&
                <div className="center">
                    <p className="center">Your recipe:</p>
                    <ul>
                        {recipe.ingredients.map((ingredient, index) => {
                            return (
                                <li key={index}>{ingredient.quantity} {ingredient.name} {ingredient.unit}</li>
                            )
                        }
                        )}
                    </ul>
                </div>
            }
        </Stack>
    )
}