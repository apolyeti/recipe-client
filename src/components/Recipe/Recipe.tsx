import IngredientComponent from '@/components/Recipe/Ingredient';
import { Recipe } from '@/utils/types';
// import heading from mui
import { Input, Stack, Typography, } from '@mui/material';
import { useState, useEffect} from 'react';

interface RecipeProps {
    Recipe : Recipe;
}

export default function Recipe(props: RecipeProps) {
    // 4 ingredient per row, then new row
    const ingredients = props.Recipe.ingredients;
    const [ingredientQuantities, setIngredientQuantities] = useState<number[]>(ingredients.map((ingredient => ingredient.quantity)));

    useEffect(() => {
        setIngredientQuantities(ingredients.map((ingredient => ingredient.quantity)));
    }, [ingredients]);


    const rows = [];
    for (let i = 0; i < ingredients.length; i += 4) {
        const row = [];
        for (let j = i; j < Math.min(i + 4, ingredients.length); j++) {
            row.push(ingredients[j]);
        }
        rows.push(row);
    }
    let originalServing = props.Recipe.servingSize;

    return (
        <Stack
            direction={"column"}
            spacing={2}
            sx={{
                width: "50%",
                margin: "auto",
                minHeight: "100vh"
            }}
        >
            <Stack
                direction={"row"}
                spacing={2}
            >
            <Typography variant="h3" color="#f2d5cf">
                Serving Size: 
            </Typography>
            <Input
                type="number"
                value={ingredientQuantities.length > 0 ? ingredientQuantities[0] : 0}
                onChange = {(event) => {
                    const newQuantity = parseInt(event.target.value);
                    setIngredientQuantities(ingredientQuantities.map((quantity) => {
                        return quantity * newQuantity / originalServing!;
                    }));
                }}
            />
            </Stack>
            {ingredients.map((ingredient, index) => (
                <Stack
                    key={index}
                    direction={"row"}
                    spacing={2}
                >
                    {/* {row.map((ingredient, index) => (
                        <IngredientComponent
                            key={index}
                            ingredient={ingredient}
                        />
                    ))} */}
                    <Typography>
                        {ingredient.name}:
                    </Typography>
                    <Input
                        type="number"
                        value={ingredientQuantities[index]}
                        onChange={(event) => {
                        const newQuantities = [...ingredientQuantities];
                        newQuantities[index] = parseInt(event.target.value);
                        setIngredientQuantities(newQuantities);
                        }}
                    />
                </Stack>
            ))}
            {ingredients.map((ingredient, index) => (
        <IngredientComponent
            key={index}
            ingredient={{ ...ingredient, quantity: ingredientQuantities[index] }}
            />
        ))}
        </Stack>
    )
}