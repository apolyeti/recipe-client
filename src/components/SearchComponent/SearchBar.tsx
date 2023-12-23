import SearchButton from "./SearchButton";
import InputBase from '@mui/material/InputBase';
import { Snackbar, Alert } from '@mui/material';
import { getIngredients } from '@/utils/api';
import { useState } from 'react';

export default function SearchBar() {
    // make search button be inside search bar
    const [url, setUrl] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [noRecipe, setNoRecipe] = useState<boolean>(false); // if no recipe found, show error message
    const [showIngredients, setShowIngredients] = useState<boolean>(false);
    const [ingredients, setIngredients] = useState({})



    const handleSearch = async () => {
        if (isValidUrl(url)) {
            console.log("valid url")
            try {
                const response = await getIngredients(url);
                console.log(response);
            } catch (error) {
                setError(true);
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