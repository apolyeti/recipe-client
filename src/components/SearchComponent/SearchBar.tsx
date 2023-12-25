import SearchButton from "./SearchButton";
import InputBase from '@mui/material/InputBase';
import type { Ingredient, Recipe } from '@/utils/types';
import { Snackbar, Alert } from '@mui/material';
import { getIngredients } from '@/utils/api';
import { useState } from 'react';

interface SearchBarProps {
    recipe: Recipe;
    setRecipe: (recipe: Recipe) => void;
    setLoading: (loading: boolean) => void;
}

export default function SearchBar(props: SearchBarProps) {
    // make search button be inside search bar
    const [url, setUrl] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [noRecipe, setNoRecipe] = useState<boolean>(false); // if no recipe found, show error message



    const handleSearch = async () => {
        if (isValidUrl(url)) {
            console.log("valid url")
            try {
                props.setLoading(true);
                const response = await getIngredients(url);
                if (response === null) {
                    setNoRecipe(true);
                    return;
                }
                const ingredients: Ingredient[] = [];
                // response has field called recipe, which is an array of ingredients
                // each ingredient has fields: name, quantity, measurement
                // foreach is not possible on response.recipe because it is not an array
                for (let i = 0; i < response.recipe.length; i++) {
                    const ingredient = response.recipe[i];
                    ingredients.push({
                        name: ingredient.name,
                        quantity: ingredient.quantity,
                        unit: ingredient.measurement
                    });
                }
                props.setRecipe({
                    ingredients: ingredients,
                    changeQuantity: props.recipe.changeQuantity
                });
                console.log(response);
                props.setLoading(false);
            } catch (error) {
                setError(true);
                props.setLoading(false);
                console.log(error);
            }
        } else {
            setError(true);
        }
    }

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