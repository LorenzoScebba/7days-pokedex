import React, {useState} from 'react'
import {Typography} from "@mui/material";
import startCase from "lodash/startCase";
import {makeStyles} from "@mui/styles";

interface IProps {
    locations: any;
}

const useStyles = makeStyles({
    link: {
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer"
    }
})


export default function PokemonLocations(props: IProps) {

    const {locations} = props;
    const [expanded, setExpanded] = useState(false);
    const classes = useStyles();

    const locationsReduced = expanded ? locations : locations.slice(0,5);
    const showExtra = locations.length > 5;

    return (
        <>
            <Typography gutterBottom variant="h5" component="div" marginTop={3}>
                Can be found in the following locations
            </Typography>
            <Typography variant="body2" color="text.primary">
                {locationsReduced.map((l: any) => {
                    return <li key={l.location_area.name}>
                        {startCase(l.location_area.name)}
                    </li>
                })}
            </Typography>
            {showExtra && !expanded && <Typography className={classes.link} marginTop={1} variant="body2" color="text.secondary" onClick={() => setExpanded(true)}>
                Expand...
            </Typography>}
            {showExtra && expanded && <Typography className={classes.link} marginTop={1} variant="body2" color="text.secondary" onClick={() => setExpanded(false)}>
                Reduce...
            </Typography>}
        </>
    )
}