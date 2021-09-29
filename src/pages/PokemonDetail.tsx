import React, {useEffect} from "react"
import {Link, useRoute} from "wouter";
import {Card, CardActionArea, CardContent, CardMedia, Container, Icon, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {
    fetchPokemon,
    fetchPokemonDescription,
    fetchPokemonLocations,
    toggleCaughtPokemon
} from "../redux/slices/pokemonSlice";
import {makeStyles} from "@mui/styles";
import get from "lodash/get"
import startCase from "lodash/startCase"

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
    },
    starIcon: {
        marginRight: "12px",
        cursor: "pointer"
    },
})

export default function PokemonDetail() {

    const [, params] = useRoute("/:id");
    const id = params?.id;
    const classes = useStyles();

    const dispatch = useAppDispatch();
    const pokemon = useAppSelector(s => s.pokemon.pokemon)
    const caughtPokemons = useAppSelector(s => s.pokemon.caughtPokemons)
    const wasCaught = caughtPokemons.includes(pokemon?.name)

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
                <Icon className={classes.starIcon} onClick={() => dispatch(toggleCaughtPokemon(pokemon.name))}>
                    {wasCaught ? "star" : "star_outline"}
                </Icon>
                <Typography gutterBottom variant="h5" component="div" marginTop={1}>
                    {startCase(pokemon.name)} (#{pokemon.id})
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {pokemon.description || "The description for this pokemon is not available"}
                </Typography>

                {pokemon.locations?.length > 0 && <>
                    <Typography gutterBottom variant="h5" component="div" marginTop={3}>
                        Can be found in the following locations
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {pokemon.locations.map((l: any) => {
                            return <div>
                                {startCase(l.location_area.name)}
                            </div>
                        })}
                    </Typography>
                </>}
                {pokemon.previous?.name && <>
                    <Typography variant="body2" color="text.primary" marginTop={3}>
                        <Link className={classes.link}
                              to={`/${pokemon.previous.url.split("https://pokeapi.co/api/v2/pokemon-species/")[1].replace("/", "")}`}>
                            {`Evolves from ${startCase(pokemon.previous.name)}`}
                        </Link>
                    </Typography>
                </>}
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