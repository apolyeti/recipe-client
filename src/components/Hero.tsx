import Stack from "@mui/material/Stack"
import SearchBar from "@/components/SearchComponent/SearchBar"
import Heading from "@components/Heading"
import RecipeComponent from "@/components/Recipe/Recipe"
import Loading from "@/components/Loading"
import { useState } from "react"
import Box from '@mui/material/Box';
import type { Recipe } from "@/utils/types"

export default function Hero() {

    // make changequantity function for recipe type

    // recipe fields:
    // ingredients: Ingredient[];

    const [recipe, setRecipe] = useState<Recipe>({
        ingredients: [],
        servingSize: 0,
        changeQuantity: (newQuantity: number) => {
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
                        <RecipeComponent Recipe={recipe}/>
                    </Box>
                }   
        </>
    )
}
