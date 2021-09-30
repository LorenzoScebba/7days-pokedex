import {fireEvent, getByText, queryByText, render} from "@testing-library/react";
import PokemonTable from "./PokemonTable";

describe('Given i want to render the pokemon table', function () {

    it('should render the empty state correctly', function () {

        const {getByText} = render(
            <PokemonTable
                rows={[]}
                rowsPerPage={10}
                page={1}
                searchMode={false}
                onCaught={jest.fn()}
                onClick={jest.fn()}
                onPageChange={jest.fn()}
                onRowsPerPageChange={jest.fn()}
            />
        )

        expect(getByText("No data found, Psyduck is sad :(")).toBeInTheDocument();
    });

    it('should render the table when data is provided', function () {
        const {getByText} = render(
            <PokemonTable
                rows={[
                    {
                        id: "1",
                        name: "Bulbasaur",
                        caught: false
                    }
                ]}
                rowsPerPage={10}
                page={0}
                searchMode={false}
                onCaught={jest.fn()}
                onClick={jest.fn()}
                onPageChange={jest.fn()}
                onRowsPerPageChange={jest.fn()}
            />
        )

        expect(getByText("#1")).toBeInTheDocument();
        expect(getByText("Bulbasaur")).toBeInTheDocument();
        expect(getByText("star_outline")).toBeInTheDocument();
    });

    it('should call the onCaught on icon click', function () {

        const onCaught = jest.fn();

        const {getByText} = render(
            <PokemonTable
                rows={[
                    {
                        id: "1",
                        name: "Bulbasaur",
                        caught: false
                    }
                ]}
                rowsPerPage={10}
                page={0}
                searchMode={false}
                onCaught={onCaught}
                onClick={jest.fn()}
                onPageChange={jest.fn()}
                onRowsPerPageChange={jest.fn()}
            />
        )

        fireEvent.click(getByText("star_outline"));

        expect(onCaught).toHaveBeenCalledTimes(1)
    });

    it('should render the table footer only if enough data is provided', function () {
        const {getByText} = render(
            <PokemonTable
                rows={[
                    {
                        "name": "bulbasaur",
                        "id": "1",
                        "caught": true
                    },
                    {
                        "name": "ivysaur",
                        "id": "2",
                        "caught": true
                    }, {
                        "name": "venusaur",
                        "id": "3",
                        "caught": true
                    }, {
                        "name": "charmander",
                        "id": "4",
                        "caught": false
                    }, {
                        "name": "charmeleon",
                        "id": "5",
                        "caught": false
                    }, {
                        "name": "charizard",
                        "id": "6",
                        "caught": false
                    }, {
                        "name": "squirtle",
                        "id": "7",
                        "caught": true
                    }, {
                        "name": "wartortle",
                        "id": "8",
                        "caught": true
                    }, {
                        "name": "blastoise",
                        "id": "9",
                        "caught": true
                    }, {
                        "name": "caterpie",
                        "id": "10",
                        "caught": true
                    }, {
                        "name": "metapod",
                        "id": "11",
                        "caught": true
                    }, {
                        "name": "butterfree",
                        "id": "12",
                        "caught": false
                    }, {
                        "name": "weedle",
                        "id": "13",
                        "caught": false
                    }, {
                        "name": "kakuna",
                        "id": "14",
                        "caught": false
                    }, {
                        "name": "beedrill",
                        "id": "15",
                        "caught": true
                    }, {
                        "name": "pidgey",
                        "id": "16",
                        "caught": false
                    }, {
                        "name": "pidgeotto",
                        "id": "17",
                        "caught": false
                    }, {
                        "name": "pidgeot",
                        "id": "18",
                        "caught": false
                    }, {
                        "name": "rattata",
                        "id": "19",
                        "caught": false
                    }, {
                        "name": "raticate",
                        "id": "20",
                        "caught": false
                    }
                ]}
                rowsPerPage={10}
                page={0}
                searchMode={false}
                onCaught={jest.fn()}
                onClick={jest.fn()}
                onPageChange={jest.fn()}
                onRowsPerPageChange={jest.fn()}
            />
        )

        expect(getByText("Rows per page:")).toBeInTheDocument();
    });

});