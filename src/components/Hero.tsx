import Stack from "@mui/material/Stack"
import SearchBar from "@/components/SearchComponent/SearchBar"
import Heading from "@components/Heading"
import RecipeComponent from "@/components/Recipe/Recipe"
import Loading from "@/components/Loading"
import GitHubIcon from '@mui/icons-material/GitHub';
import { useState } from "react"
import Box from '@mui/material/Box';
import type { Recipe } from "@/utils/types"
import { IconButton } from "@mui/material"

export default function Hero() {

    // make changequantity function for recipe type

    // recipe fields:
    // ingredients: Ingredient[];

    const [recipe, setRecipe] = useState<Recipe>({
        ingredients: [],
        servingSize: 0,
        changeQuantity: (newQuantity: number) => {
            if (!newQuantity || newQuantity < 1) {
                newQuantity = 1;
            }
            setRecipe({
                ...recipe,
                servingSize: newQuantity,
                ingredients: recipe.ingredients.map((ingredient) => {
                    return {
                        ...ingredient,
                        quantity: ingredient.quantity * newQuantity / recipe.servingSize
                    }
                })
            })
        }
    });

    const [loading, setLoading] = useState<boolean>(false);

    const [recipeAmounts, setRecipeAmounts] = useState<number[]>([]);


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
                <SearchBar recipe={recipe} setRecipe={setRecipe} setLoading={setLoading} recipeAmounts={recipeAmounts} setRecipeAmounts={setRecipeAmounts}/>
                <IconButton
                    onClick={() => window.open("https://github.com/apolyeti/recipe-client")}
                    sx={{
                        position: "absolute",
                        transform: "scale(1.5)",
                        transition: "transform 0.2s ease-in-out",
                        border: "0px",
                        shadow: "0px",
                        color: "#f2d5cf",
                        top: "1rem",
                        right: "1rem",
                        "&:hover": {
                            color: "#f2cdcf",
                            transform: "scale(1.6)",
                            transition: "transform 0.2s ease-in-out",
                            cursor: "pointer",
                            shadow: "0px",
                            border: "0px",
                        }
                    }}
                >
                    <GitHubIcon />
                </IconButton>
                {loading && 
                    <Box sx={{width : "45%", padding: "20px"}} >
                        <Stack direction={"column"}>
                            <Loading />
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
                        <RecipeComponent Recipe={recipe} recipeAmounts={recipeAmounts} setRecipeAmounts={setRecipeAmounts}/>
                    </Box>
                }   
        </>
    )
}
