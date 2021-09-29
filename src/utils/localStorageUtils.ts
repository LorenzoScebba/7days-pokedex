const caughtPokemonKey = "pokemon:caught";

export const getCaughtPokemon = () => {
    const result = localStorage.getItem(caughtPokemonKey);
    if(result)
        return JSON.parse(result);

    return []
}

export const setCaughtPokemon = (values: string[]) => {
    localStorage.setItem(caughtPokemonKey, JSON.stringify(values));
}