import type { Ingredient } from "@/utils/types"
import { Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material"
import { useState } from "react"
import { motion } from 'framer-motion';

interface IngredientProps {
    ingredient: Ingredient;
    fadeOffset: number;
    ingredientAmount: number;
}

export default function Ingredient(props: IngredientProps) {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 1, delay: props.fadeOffset}}
        >
        <Card
            sx={{
                transform: "scale(1)",
                transition: "transform 0.2s ease-in-out",
                width: "10rem",
                minHeight: "15rem",
                backgroundColor: "#f4dbd6",
                "&:hover": {
                    backgroundColor: "#f2cdcd",
                    // ease in out in scale
                    transform: "scale(1.04)",
                    transition: "transform 0.1s ease-in-out",
                    cursor: "pointer",
                }
            }}
        >
            <CardHeader
                title={props.ingredient.name.toLowerCase()}
            />
            <CardContent>
                <Typography variant="body1" color="text.primary" fontSize={"2rem"}>
                    {typeof props.ingredientAmount === "number" ? props.ingredientAmount.toFixed(2) : props.ingredientAmount}
                </Typography>
                <Typography variant="body1" color="text.secondary" fontSize={"1.5rem"}>
                    {props.ingredient.unit.toLowerCase()}
                </Typography>
            </CardContent>
        </Card>
        </motion.div>
    )
}
    

