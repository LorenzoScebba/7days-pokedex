import React from "react"
import {ITableEntry} from "../models/interfaces";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow, Typography
} from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import {makeStyles} from "@mui/styles";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {setItemsPerPage, setPage} from "../redux/slices/pokemonSlice";
import startCase from "lodash/startCase";
import CaughtIcon from "./CaughtIcon";

interface IProps {
    rows: ITableEntry[]
    onCaught: (name: string) => void;
    onClick: (v: string) => void;
    searchMode: boolean;
}

const useStyles = makeStyles({
    row: {
        transition: "box-shadow 0.2s ease",
        "&:hover": {
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
            cursor: "pointer",
        }
    },
    nodata: {
        display: "grid",
        placeContent: "center",
        textAlign: "center",
        "& > img": {
            marginTop: 32
        }
    }
})

export default function PokemonTable(props: IProps) {

    const classes = useStyles();
    const rowsPerPage = useAppSelector(p => p.pokemon.itemsPerPage)
    const page = useAppSelector(p => p.pokemon.page);
    const dispatch = useAppDispatch();
    const {rows} = props;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        dispatch(setPage(newPage))
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        dispatch(setItemsPerPage(parseInt(event.target.value, 10)))
        dispatch(setPage(0))
    };

    if(rows.length === 0)
        return <div className={classes.nodata}>
            <Typography>
                No data found, Psyduck is sad :(
            </Typography>
            <img alt={"Psyduck is crying"} src={"https://cdn2.bulbagarden.net/upload/thumb/5/53/054Psyduck.png/600px-054Psyduck.png"} />
        </div>

    return <TableContainer>
        <Table stickyHeader={true} sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
                <TableRow>
                    <TableCell align={"center"}>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align={"right"}>Caught</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {(!props.searchMode && rowsPerPage > 0
                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : rows
                ).map((row) => (
                    <TableRow key={row.name} className={classes.row} onClick={() => props.onClick(row.id)}>
                        <TableCell component="th" scope="row" width={256} align={"center"}>
                            {row.id}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {startCase(row.name)}
                        </TableCell>
                        <TableCell component="th" scope="row" align={"right"}>
                            <CaughtIcon caught={row.caught} name={row.name} onToggle={(v) => props.onCaught(v)} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            {!props.searchMode && rows.length > rowsPerPage && <TableFooter>
                <TableRow>
                    <TablePagination
                        rowsPerPageOptions={[10, 15, 20, 30, 40, 50]}
                        colSpan={3}
                        count={rows.length}
                        rowsPerPage={props.searchMode ? -1 : rowsPerPage}
                        page={page}
                        SelectProps={{
                            native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                    />
                </TableRow>
            </TableFooter>}
        </Table>
    </TableContainer>
}