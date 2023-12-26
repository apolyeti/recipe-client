export type urlBody = {
    contentType: string,
    ok: boolean,
    origUrl: string,
    status: number,
    statusText: string,
    url: string,
}

export type Ingredient = {
    name: string,
    quantity: number,
    unit: string,
}

export type Recipe = {
    servingSize: number;
    ingredients : Ingredient[],
    changeQuantity : (multiplier : number) => void,
}
