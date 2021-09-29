import React from 'react'
import {Icon} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    starIcon: {
        marginRight: "12px",
        cursor: "pointer"
    }
})

interface IProps {
    onToggle: (name: string) => void;
    name: string;
    caught: boolean;
}

export default function CaughtIcon(props: IProps) {

    const classes = useStyles();
    const {name, caught} = props;

    return (
        <Icon className={classes.starIcon} onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            props.onToggle(name)
        }}>
            {caught ? "star" : "star_outline"}
        </Icon>
    )
}