import {fireEvent, render} from "@testing-library/react";
import PokemonLocations from "./PokemonLocations";
import {ILocation} from "../../models/interfaces";

describe('Given i want to render pokemon basic content', function () {

    const generateLocation = (name: string) => ({
        location_area: {
            name
        }
    })

    it('should render the found locations', function () {

        const locations = [
            generateLocation("Area 1")
        ] as ILocation[]

        const {getByText} = render(
            <PokemonLocations locations={locations}/>
        )

        expect(getByText("Area 1")).toBeInTheDocument();
    });

    it('should render the first 3 locations + a expand text', function () {

        const locations = [
            generateLocation("Area 1"),
            generateLocation("Area 2"),
            generateLocation("Area 3"),
            generateLocation("Area 4"),
        ] as ILocation[]

        const {getByText, queryByText} = render(
            <PokemonLocations locations={locations}/>
        )

        expect(getByText("Area 1")).toBeInTheDocument();
        expect(getByText("Area 2")).toBeInTheDocument();
        expect(getByText("Area 3")).toBeInTheDocument();
        expect(queryByText("Area 4")).not.toBeInTheDocument();
    });

    it('should render all the locations on expand', function () {

        const locations = [
            generateLocation("Area 1"),
            generateLocation("Area 2"),
            generateLocation("Area 3"),
            generateLocation("Area 4"),
        ] as ILocation[]

        const {getByText} = render(
            <PokemonLocations locations={locations}/>
        )

        fireEvent.click(getByText("Expand..."))

        expect(getByText("Area 1")).toBeInTheDocument();
        expect(getByText("Area 2")).toBeInTheDocument();
        expect(getByText("Area 3")).toBeInTheDocument();
        expect(getByText("Area 4")).toBeInTheDocument();
    });

    it('should render reduce the locations on reduce click', function () {

        const locations = [
            generateLocation("Area 1"),
            generateLocation("Area 2"),
            generateLocation("Area 3"),
            generateLocation("Area 4"),
        ] as ILocation[]

        const {getByText, queryByText} = render(
            <PokemonLocations locations={locations}/>
        )

        fireEvent.click(getByText("Expand..."))
        fireEvent.click(getByText("Reduce..."))

        expect(getByText("Area 1")).toBeInTheDocument();
        expect(getByText("Area 2")).toBeInTheDocument();
        expect(getByText("Area 3")).toBeInTheDocument();
        expect(queryByText("Area 4")).not.toBeInTheDocument();
    });

});