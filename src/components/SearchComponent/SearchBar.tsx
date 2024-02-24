import SearchButton from "./SearchButton";
import InputBase from '@mui/material/InputBase';
import type { Ingredient, Recipe } from '@/utils/types';
import { Snackbar, Alert } from '@mui/material';
import { getIngredients } from '@/utils/api';
import { useState } from 'react';
import { TIMEOUT } from "dns";
import { preconnect } from "react-dom";

interface SearchBarProps {
    recipe: Recipe;
    setRecipe: (recipe: Recipe) => void;
    setLoading: (loading: boolean) => void;
    recipeAmounts: number[];
    setRecipeAmounts: (amounts: number[]) => void;
}

export default function SearchBar(props: SearchBarProps) {
    // make search button be inside search bar
    const [url, setUrl] = useState<string>("");
    const [isRunning, setIsRunning] = useState<boolean>(false); // if true, disable search button
    const [error, setError] = useState<boolean>(false);
    const [noRecipe, setNoRecipe] = useState<boolean>(false); // if no recipe found, show error message
    const [lastUrl, setLastUrl] = useState<string>("");

    // set last url to be the last url searched by the user, if it exists
    if (typeof window !== "undefined") {
        window.onbeforeunload = () => {
            localStorage.setItem("lastUrl", url);
        }
    }
    if (typeof window !== "undefined" && localStorage.getItem("lastUrl") !== null && lastUrl === "") {
        setLastUrl(localStorage.getItem("lastUrl") as string);
        setUrl(localStorage.getItem("lastUrl") as string);
    }
    

    const handleSearch = async () => {
        if (isRunning) {
            return;
        }
        props.setRecipe({ingredients: [], servingSize: 0, changeQuantity: () => {}});
        setIsRunning(true);
        if (isValidUrl(url)) {
            console.log("valid url")
            try {
                props.setLoading(true);
                const response = await getIngredients(url);
                if (response === null) {
                    setNoRecipe(true);
                    return;
                }
                let ingredients: Ingredient[] = [];
                // response has field called recipe, which is an array of ingredients
                // each ingredient has fields: name, quantity, measurement
                // foreach is not possible on response.recipe because it is not an array
                let ingredients_temp = [];
                for (let i = 0; i < response.recipe.length; i++) {
                    const ingredient = response.recipe[i];
                    ingredients.push({
                        name: ingredient.name,
                        quantity: ingredient.quantity,
                        unit: ingredient.measurement
                    });
                    ingredients_temp.push(ingredient.quantity);

                    // add amount to recipeAmounts
                    // but since recipeAmounts is useState, we need to use setRecipeAmounts
                }
                props.setRecipeAmounts(ingredients_temp);
                props.setRecipe({
                    servingSize: props.recipe.servingSize,
                    ingredients: ingredients,
                    changeQuantity: props.recipe.changeQuantity
                });
                console.log(response);
                props.setLoading(false);
                setTimeout(() => {
                    document.getElementById("recipe")?.scrollIntoView({behavior: "smooth"})
                }, 50)
                localStorage.setItem("lastUrl", url);
            } catch (error) {
                setError(true);
                props.setLoading(false);
                console.log(error);
            }
        } else {
            setError(true);
        }
        setIsRunning(false);
    }

    /* HELPERS FOR HANDLESEARCH AND INPUT COMPONENTS */
    function isValidUrl(url: string) {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUrl(event.target.value);
    }

    return (
        <>
            <InputBase
                value={url}
                className="searchbar"
                type="text" 
                placeholder="Enter URL to recipe" 
                endAdornment={<SearchButton handleSearch={handleSearch} disabled={isValidUrl(url)}/>}
                onChange={handleChange}
                sx={{
                    "&:hover": {
                        cursor: "pointer"
                    }
                }}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        handleSearch();
                    }
                }}
            />
            <Snackbar
                open={error}
                autoHideDuration={6000}
                onClose={() => setError(false)}
            >
                <Alert severity="error" sx={{ width: '100%' }}>
                    Invalid URL
                </Alert>
            </Snackbar>
            <Snackbar
                open={noRecipe}
                autoHideDuration={6000}
                onClose={() => setNoRecipe(false)}
            >
                <Alert severity="error" sx={{ width: '100%' }}>
                    No recipe found
                </Alert>
            </Snackbar>
        </>
    )
}