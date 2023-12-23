export const getIngredients = async (url : string) => {
    try {
        const reqBody = {
            url: url
        };
        const req = await fetch("http://localhost:1323/api/ingredients", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reqBody)
        });
        const res = await req.json();

        if (res.error) {
            throw new Error(res.error);
        }
        console.log("Response successful.");
        return res;
    } catch (error) {
        console.log("Error: ", error);
        return {error};
    }
};