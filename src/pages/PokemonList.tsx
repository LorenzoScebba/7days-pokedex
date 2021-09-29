import React from "react"
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {Container, Icon, InputAdornment, MenuItem, Select, TextField, Tooltip} from "@mui/material";
import {makeStyles} from "@mui/styles";
import PokemonTable from "../components/PokemonTable";
import {setFilter, setSearchText, toggleCaughtPokemon} from "../redux/slices/pokemonSlice";
import {useLocation} from "wouter";

const useStyles = makeStyles({
    root: {
        height: window.innerHeight - 128,
        padding: "0 2px",
        margin: "16px 0"
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        "& > div:not(:last-of-type)": {
            marginRight: "16px"
        }
    }
})

export default function PokemonList() {

    const classes = useStyles();
    const dispatch = useAppDispatch();
    const [, setLocation] = useLocation();
    const pokemons = useAppSelector(s => s.pokemon.pokemons)
    const search = useAppSelector(s => s.pokemon.search)
    const caught = useAppSelector(s => s.pokemon.caughtPokemons)
    const filter = useAppSelector(s => s.pokemon.filter)

    let rows = pokemons && search.length >= 2 ? pokemons.filter(p => p.name.toLowerCase().includes(search.toLowerCase())) : pokemons;

    if (filter === "caught") {
        rows = rows.filter(p => caught.includes(p.name))
    } else if (filter === "remaining") {
        rows = rows.filter(p => !caught.includes(p.name))
    }

    return <Container className={classes.root} maxWidth={"xl"}>
        <div className={classes.toolbar}>
            <Select
                value={filter}
                onChange={v => dispatch(setFilter(v.target.value))}
            >
                <MenuItem value={"all"}>Show all</MenuItem>
                <MenuItem value={"caught"}>Show caught only</MenuItem>
                <MenuItem value={"remaining"}>Show not caught</MenuItem>
            </Select>
           <Tooltip title={"Insert at least 2 characters to search"}>
               <TextField
                   variant={"standard"}
                   placeholder={"Search Pokemon"}
                   value={search}
                   onChange={v => {
                       dispatch(setSearchText(v.target.value))
                   }}
                   InputProps={{
                       startAdornment: <InputAdornment position="start">
                           <Icon>search</Icon>
                       </InputAdornment>,
                   }}
               />
           </Tooltip>
        </div>
        <PokemonTable
            // Pokemon with shortest name is "mew"
            searchMode={search.length >= 2}
            rows={rows}
            onCaught={(value) => dispatch(toggleCaughtPokemon(value))}
            caughtPokemons={caught}
            onClick={(v) => {
                setLocation(`/${v}`)
            }}
        />
    </Container>
}