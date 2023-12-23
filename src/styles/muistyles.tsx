const styles = {
    searchInputBase: {
        width: "100%",
                height: "100%",
                fontSize: "1.5rem",
                borderRadius: "1rem",
                border: "1px solid black",
                padding: "1rem",
                boxSizing: "border-box",
                "&:focus": {
                    outline: "none",
                }
    },
    searchButton : {
        "&:hover": {
            color: "black"
        },
        "&:disabled": {
            color: "gray"
        }
    }
}

export default styles;

