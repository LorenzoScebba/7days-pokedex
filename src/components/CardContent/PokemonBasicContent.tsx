import React from 'react'
import {Typography} from "@mui/material";
import startCase from "lodash/startCase";

interface IProps {
    name: string;
    id: string;
    description?: string;
}

export default function PokemonBasicContent(props: IProps) {

    const {id, name, description} = props;

    return (
        <>
            <Typography gutterBottom variant="h5" component="div" marginTop={1}>
                {startCase(name)} (#{id})
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {description || "The description for this pokemon is not available"}
            </Typography>
        </>
    )
}