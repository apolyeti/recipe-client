import type { Ingredient } from "@/utils/types"
import { Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material"
import { useState } from "react"

interface IngredientProps {
    ingredient: Ingredient;
}

export default function Ingredient(props: IngredientProps) {
    return (
        <Card
            sx={{
                backgroundColor: "#a6adc8"
            }}
        >
            <CardHeader
                title={props.ingredient.name}

            />
            <CardContent>
                <Typography variant="body1" color="text.secondary">
                    {props.ingredient.unit}
                </Typography>
            </CardContent>
        </Card>
    )
}
    

