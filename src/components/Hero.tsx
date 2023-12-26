import Stack from "@mui/material/Stack"
import { LinearProgress, Tab } from "@mui/material"
import SearchBar from "@/components/SearchComponent/SearchBar"
import Heading from "@components/Heading"
import RecipeComponent from "@/components/Recipe/Recipe"
import { useState } from "react"
import Box from '@mui/material/Box';
import type { Recipe } from "@/utils/types"

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
        <>
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Heading />
                <SearchBar recipe={recipe} setRecipe={setRecipe} setLoading={setLoading}/>
                {loading && 
                    <Box sx={{width : "50%"}}>
                        <Stack direction={"column"}>
                            <LinearProgress />
                        </Stack>    
                    </Box>
                }
        </Box>
                {recipe.ingredients.length > 0 &&
                    <Box
                        id="recipe"
                        sx={{
                            padding: "2rem",
                            minHeight: "100vh",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <RecipeComponent Recipe={recipe}/>
                    </Box>
                }   
        </>
    )
}