//import Input from '@mui/joy/Input';



export default function SearchBar() {

    function handleSearch() {
        console.log("searching");
    }
    
    return (
        //<Input className="searchbar" placeholder="Paste URL here" />
       <input className="searchbar" type="text" placeholder="Paste URL here" />
    )
}