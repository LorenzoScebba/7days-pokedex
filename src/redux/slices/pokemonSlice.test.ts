import {
    initialState,
    pokemonSlice,
    setFilter,
    setItemsPerPage,
    setPage,
    setSearchText,
    toggleCaughtPokemon
} from './pokemonSlice'

describe('Given i want to test the pokemon slice', function () {

    test('should return the initial state', () => {
        expect(pokemonSlice.reducer(undefined, {type: ""})).toEqual({
            caughtPokemons: [],
            filter: "all",
            isFetchingList: true,
            isFetchingPokemon: true,
            itemsPerPage: 15,
            page: 0,
            pokemon: {},
            pokemons: [],
            search: ""
        })
    })

    test('should add pokemon to caught pokemons', () => {
        const state = pokemonSlice.reducer(undefined, toggleCaughtPokemon("bulbasaur"));

        expect(state.caughtPokemons).toEqual(["bulbasaur"])
    })

    test('should remove pokemon to caught pokemons', () => {
        const state = pokemonSlice.reducer({
            ...initialState,
            caughtPokemons: ["bulbasaur"]
        }, toggleCaughtPokemon("bulbasaur"));

        expect(state.caughtPokemons).toEqual([])
    })

    test('should set the search text', () => {
        const state = pokemonSlice.reducer(undefined, setSearchText("bulbasaur"));

        expect(state.search).toEqual("bulbasaur")
    })

    test.each([
        ["all", "all"],
        ["caught", "caught"],
        ["remaining", "remaining"],
        ["unknown", "all"]
    ])('should set the correct filter "%s" -> "%s"', (filter, expected) => {
        const state = pokemonSlice.reducer(undefined, setFilter(filter));

        expect(state.filter).toEqual(expected)
    })

    test('should set the page', () => {
        const state = pokemonSlice.reducer(undefined, setPage(1));

        expect(state.page).toEqual(1)
    })


    test('should set the items per page', () => {
        const state = pokemonSlice.reducer(undefined, setItemsPerPage(10));

        expect(state.itemsPerPage).toEqual(10)
    })

});