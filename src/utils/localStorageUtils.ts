const caughtPokemonsKey = "pokemons:caught";

export const getCaughtPokemons = () => {
    const result = localStorage.getItem(caughtPokemonsKey);
    if(result)
        return JSON.parse(result);

    return []
}

export const setCaughtPokemons = (pokemons: string[]) => {
    localStorage.setItem(caughtPokemonsKey, JSON.stringify(pokemons));
}