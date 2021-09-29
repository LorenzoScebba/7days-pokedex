import {AppBar, Toolbar, Typography} from "@mui/material"
import React from "react"
import {makeStyles} from "@mui/styles";
import {Link} from "wouter"

interface IProps {
}

const useStyles = makeStyles({
    root: {
        boxShadow: "none !important"
    },
    link: {
        textDecoration: "none",
        color: "white"
    }
})

export default function ApplicationBar(props: IProps) {

    const classes = useStyles();

    return <AppBar position="static" className={classes.root}>
        <Toolbar >
            <Typography
                variant="h6"
            >
                <Link to={"/"} className={classes.link}>
                    7Days Pokédex
                </Link>
            </Typography>
        </Toolbar>
    </AppBar>
}