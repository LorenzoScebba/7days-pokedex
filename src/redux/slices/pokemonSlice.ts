import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IListEntry} from "../../models/interfaces";
import {getCaughtPokemon, setCaughtPokemon} from "../../utils/localStorageUtils";

// Define a type for the slice state
interface PokemonState {
    isFetchingList: boolean
    isFetchingPokemon: boolean
    pokemons: IListEntry[]
    search: string
    caughtPokemons: string[]
    filter: "all" | "caught" | "remaining"
    pokemon: any
    page: number
}

// Define the initial state using that type
const initialState: PokemonState = {
    isFetchingList: true,
    isFetchingPokemon: true,
    pokemons: [],
    caughtPokemons: getCaughtPokemon(),
    search: "",
    filter: "all",
    pokemon: {},
    page: 0
}

export const fetchAllPokemons = createAsyncThunk(
    'pokemon/fetchAll',
    async () => {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=-1");
        const jsonResponse = await response.json();

        return jsonResponse.results.map((d: any) => ({
            id: d.url.split("https://pokeapi.co/api/v2/pokemon/")[1].replace("/", ""),
            name: d.name,
            url: d.url,
        } as IListEntry));
    }
)

export const fetchPokemon = createAsyncThunk(
    'pokemon/fetch',
    async (pokemonId: string, _) => {
        const pokemonReq = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        return await pokemonReq.json();
    }
)

export const fetchPokemonDescription = createAsyncThunk(
    'pokemon/fetchDescription',
    async (pokemonId: string, _) => {

        const characteristic = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
        return await characteristic.json();
    }
)

export const fetchPokemonLocations = createAsyncThunk(
    'pokemon/fetchLocation',
    async (pokemonId: string, _) => {
        const canBeFound = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/encounters`);
        return await canBeFound.json();
    }
)

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        toggleCaughtPokemon: (state, action: PayloadAction<string>) => {
            if(state.caughtPokemons.includes(action.payload)){
                state.caughtPokemons.splice(state.caughtPokemons.indexOf(action.payload), 1);
            }else{
                state.caughtPokemons.push(action.payload)
            }

            setCaughtPokemon(state.caughtPokemons);
        },
        setSearchText: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        setFilter: (state, action: PayloadAction<string>) => {
            switch (action.payload){
                case "all":
                    state.filter = "all";
                    break;
                case "caught":
                    state.filter = "caught";
                    break;
                case "remaining":
                    state.filter = "remaining";
                    break;
                default:
                    state.filter = "all"
            }
            state.page = 0;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllPokemons.fulfilled, (state, action: { payload: IListEntry[] }) => {
            state.isFetchingList = false;
            state.pokemons = action.payload;
        })
        builder.addCase(fetchPokemon.pending, (state, action) => {
            state.pokemon = {}
        })
        builder.addCase(fetchPokemon.fulfilled, (state, action) => {
            state.pokemon.id = action.payload.id;
            state.pokemon.name = action.payload.name;
            state.pokemon.sprites = action.payload.sprites;
        })
        builder.addCase(fetchPokemonDescription.fulfilled, (state, action) => {
            state.pokemon.previous = action.payload.evolves_from_species;
            state.pokemon.description = action.payload.flavor_text_entries.filter((e: any) => e.language.name === "en").reverse()[0].flavor_text;
        })
        builder.addCase(fetchPokemonLocations.fulfilled, (state, action) => {
            state.pokemon.locations = action.payload;
        })
    },
})

export const {toggleCaughtPokemon, setSearchText, setFilter, setPage} = pokemonSlice.actions