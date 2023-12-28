import IngredientComponent from '@/components/Recipe/Ingredient';
import { Recipe } from '@/utils/types';
// import heading from mui
import { Input, InputBase, Stack, Typography, } from '@mui/material';
import { useState, useEffect} from 'react';

interface RecipeProps {
    Recipe : Recipe;
}

export default function Recipe(props: RecipeProps) {
    // 4 ingredient per row, then new row
    const { ingredients, servingSize, changeQuantity } = props.Recipe;
    const [originalServing, setOriginalServing] = useState<number>(servingSize);

    useEffect(() => {
        setOriginalServing(servingSize);
    }, [servingSize])

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(event.target.value);
        setOriginalServing(newQuantity);
        changeQuantity(newQuantity);
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
            <Typography variant="h3" color="#f2d5cf">
                Serving Size: 
            </Typography>
            <InputBase
                value={originalServing}
                onChange={(event) => {
                    const newQuantity = parseInt(event.target.value);
                    props.Recipe.changeQuantity(newQuantity);
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
                        {row.map((ingredient) => {
                            return (
                                <IngredientComponent
                                    ingredient={ingredient}
                                    key={ingredient.name}
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