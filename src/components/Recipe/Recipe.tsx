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
    // 4 ingredient per row, then new row
    const { ingredients, servingSize, changeQuantity } = props.Recipe;
    const [currentServingSize, setServingSize] = useState<number>(servingSize);
    const originalServing = servingSize || 1;
    let offset = 0.5;
    // useEffect(() => {
    //     if (originalServing == 0) {
    //         setOriginalServing(1);
    //     }
    // }, [props.recipeAmounts, originalServing])

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        const newQuantity = parseInt(event.target.value);
        if (!newQuantity || newQuantity < 1) {

            setServingSize(1);
            return;
        }
        setServingSize(newQuantity);
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
            <input
                value={currentServingSize}
                onChange={(event) => {
                    handleQuantityChange(event);
                }}
                type='number'
                // sx={{
                //     width: "3rem",
                //     padding: "0.5rem",
                //     borderRadius: "0.5rem",
                //     color: "#f4dbd6",
                //     fontSize: "1.5rem",

                // }}
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