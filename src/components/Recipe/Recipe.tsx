import IngredientComponent from '@/components/Recipe/Ingredient';
import { Recipe } from '@/utils/types';
// import heading from mui
import { Input, InputBase, Stack, Typography, } from '@mui/material';
import { useState, useEffect} from 'react';

interface RecipeProps {
    Recipe : Recipe;
    setRecipeAmounts: (amounts: number[]) => void;
    recipeAmounts: number[];
}

export default function Recipe(props: RecipeProps) {
    const { ingredients, servingSize, changeQuantity } = props.Recipe;
    const [currentServingSize, setServingSize] = useState<string>(servingSize + ""|| "1");
    const originalServing = servingSize || 1;
    let offset = 0.5;

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        // cheeck if is a number or a . or  empty, if not, return early
        if (event.target.value.length > 0 && isNaN(parseFloat(event.target.value))) {
            return;
        }
        // check if ends in a . and if so, return function early so that the user can continue typing
        if (event.target.value.endsWith(".")) {
            setServingSize(event.target.value);
            return;
        }
        const newQuantity = parseFloat(event.target.value);
        if (!newQuantity || newQuantity  == 0) {
            setServingSize(event.target.value);
            return;
        }
        setServingSize(newQuantity + "");
        const multiplier = newQuantity / originalServing;
        props.setRecipeAmounts(ingredients.map((ingredient) => ingredient.quantity * multiplier));
    }


    const rows = [];
    for (let i = 0; i < ingredients.length; i += 4) {
        const row = [];
        for (let j = i; j < Math.min(i + 4, ingredients.length); j++) {
            row.push(ingredients[j]);
        }
        rows.push(row);
    }


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
            <Typography className="serving">
                serving size:
            </Typography>
            <InputBase
                //move downa little
                value={currentServingSize}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    handleQuantityChange(event);
                }}
                sx={{
                    width: "10rem",
                    color: "#f4dbd6",
                    fontSize: "3rem",
                    // move down a little
                    transform: "translateY(0.3rem)",
                }}
            />
            </Stack>
            {rows.map((row, index) => {
                return (
                    <Stack
                        direction={"row"}
                        spacing={2}
                        key={index}
                    >
                        {row.map((ingredient, i) => {
                            offset+=0.1;
                            return (
                                <IngredientComponent
                                    ingredient={ingredient}
                                    ingredientAmount={props.recipeAmounts[i]}
                                    key={ingredient.name}
                                    fadeOffset={offset}
                                />
                            )
                        })}
                    </Stack>
                )
            }
        )}
        </Stack>
    )
}