import React, {useEffect} from "react"
import {useRoute} from "wouter";
import {Card, CardActionArea, CardContent, CardMedia, Container} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {
    fetchPokemon,
    fetchPokemonDescription,
    fetchPokemonLocations,
    toggleCaughtPokemon
} from "../redux/slices/pokemonSlice";
import {makeStyles} from "@mui/styles";
import get from "lodash/get"
import PokemonLocations from "../components/CardContent/PokemonLocations";
import EvolvesFrom from "../components/CardContent/EvolvesFrom";
import PokemonBasicContent from "../components/CardContent/PokemonBasicContent";
import CaughtIcon from "../components/CaughtIcon";

const useStyles = makeStyles({
    root: {
        display: "grid !important",
        placeContent: "center",
        margin: "16px 0"
    },
    content: {
        width: "-webkit-fill-available"
    },
    link: {
        textDecoration: "none",
        color: "inherit"
    }
})

export default function PokemonDetail() {

    const [, params] = useRoute("/:id");
    const id = params?.id;
    const classes = useStyles();

    const dispatch = useAppDispatch();
    const pokemon = useAppSelector(s => s.pokemon.pokemon)
    const caughtPokemon = useAppSelector(s => s.pokemon.caughtPokemons)
    const wasCaught = caughtPokemon.includes(pokemon?.name)

    useEffect(() => {
        if (id) {
            dispatch(fetchPokemon(id));
            dispatch(fetchPokemonLocations(id));
            dispatch(fetchPokemonDescription(id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    return <Container className={classes.root}>
        {pokemon.id && <Card sx={{display: "flex"}}>
            <CardContent className={classes.content}>
                <CaughtIcon caught={wasCaught} name={pokemon.name} onToggle={(v) => dispatch(toggleCaughtPokemon(v))} />
                <PokemonBasicContent name={pokemon.name} id={pokemon.id} description={pokemon.description} />

                {pokemon.locations?.length > 0 && <PokemonLocations locations={pokemon.locations} />}
                {pokemon.previous?.name && <EvolvesFrom url={pokemon.previous?.url} name={pokemon.previous.name} /> }
            </CardContent>
            <CardActionArea>
                <CardMedia
                    component="img"
                    width={240}
                    image={get(pokemon, "sprites.other.official-artwork.front_default", get(pokemon, "sprites.front_default"))}
                />
            </CardActionArea>
        </Card>}
    </Container>
}