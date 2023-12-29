import { createTheme } from "@mui/material/styles";
import { Fredoka } from "next/font/google";

export const fredoka = Fredoka({
  subsets: ["latin"],
});

// Create a theme instance.
const theme = createTheme({
    typography : {
        allVariants: {
            fontFamily: fredoka.style.fontFamily,
        },
    },
});

export default theme;

