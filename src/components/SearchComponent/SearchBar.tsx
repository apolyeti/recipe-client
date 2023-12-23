import Input from '@mui/joy/Input';
import SearchButton from "./SearchButton";
import InputBase from '@mui/material/InputBase';
import { useState } from 'react';

export default function SearchBar() {
    // make search button be inside search bar
    const [url, setUrl] = useState<string>("");

    function handleSearch() {
        // get url from search bar
        // fetch url
        // parse url
        // display parsed url
        console.log("searching");
    }

    function validateUrl(url: string) {
        // check if url is valid
        // return true or false
        return true;
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUrl(event.target.value);
    }

    return (
        <InputBase
            className="searchbar"
            type="text" 
            placeholder="Enter URL to recipe" 
            endAdornment={<SearchButton handleSearch={handleSearch} disabled={validateUrl(url)}/>}
            onChange={handleChange}
            sx={{
                "&:hover": {
                    cursor: "pointer"
                }
            }}
        />
    )
}