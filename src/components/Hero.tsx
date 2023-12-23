import Stack from "@mui/material/Stack"
import SearchBar from "@/components/SearchComponent/SearchBar"
import Heading from "@components/Heading"

export default function Hero() {
    return (
        <Stack
            direction={"column"}>
            <Heading />
            <div 
                className="center"
            >
                <SearchBar />
            </div>
        </Stack>
    )
}