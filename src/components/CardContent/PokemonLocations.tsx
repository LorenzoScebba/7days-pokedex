import React from 'react'
import {Typography} from "@mui/material";
import startCase from "lodash/startCase";

interface IProps {
    locations: any;
}

export default function PokemonLocations(props: IProps) {

    const {locations} = props;

    return (
        <>
            <Typography gutterBottom variant="h5" component="div" marginTop={3}>
                Can be found in the following locations
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {locations.map((l: any) => {
                    return <div>
                        {startCase(l.location_area.name)}
                    </div>
                })}
            </Typography>
        </>
    )
}