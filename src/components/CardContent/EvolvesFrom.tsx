import React from 'react'
import {Link} from "wouter";
import startCase from "lodash/startCase";
import {Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";

interface IProps {
    url: string;
    name: string;
}

const useStyles = makeStyles({
    link: {
        textDecoration: "none",
        color: "inherit"
    },
})

export default function EvolvesFrom(props: IProps) {

    const classes = useStyles();
    const {name, url} = props;

    return (
        <Typography variant="body2" color="text.primary" marginTop={3}>
            <Link className={classes.link}
                  to={`/${url.split("https://pokeapi.co/api/v2/pokemon-species/")[1].replace("/", "")}`}>
                {`Evolves from ${startCase(name)}`}
            </Link>
        </Typography>
    )
}