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
                width: "10rem",
                minHeight: "12rem",
                backgroundColor: "#a6adc8",
                "&:hover": {
                    backgroundColor: "#cdd6f4",
                    // ease in out in scale
                    transform: "scale(1.02)",
                    transition: "transform 0.1s ease-in-out"
                }
            }}
        >
            <CardHeader
                title={props.ingredient.name}
            />
            <CardContent>
                <Typography variant="body1" color="text.primary" fontSize={"2rem"}>
                    {props.ingredient.quantity}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {props.ingredient.unit}
                </Typography>
            </CardContent>
        </Card>
    )
}
    

