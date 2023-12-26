import IngredientComponent from '@/components/Recipe/Ingredient';
import { Recipe } from '@/utils/types';
import { Stack, } from '@mui/material';
import React from 'react';

interface RecipeProps {
    Recipe : Recipe;
}

export default function Recipe(props: RecipeProps) {
    // 4 ingredient per row, then new row

    const ingredients = props.Recipe.ingredients;
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
            {rows.map((row, index) => (
                <Stack
                    key={index}
                    direction={"row"}
                    spacing={2}
                >
                    {row.map((ingredient, index) => (
                        <IngredientComponent
                            key={index}
                            ingredient={ingredient}
                        />
                    ))}
                </Stack>
            ))}
        </Stack>
    )
}