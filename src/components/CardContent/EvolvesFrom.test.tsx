import {render} from "@testing-library/react";
import EvolvesFrom from "./EvolvesFrom";

describe('Given i want to render evolves from section', function () {

    it('should render the pokemon name and the right url', function () {
        const {getByText, container} = render(
            <EvolvesFrom name={"Bulbasaur"} url={"https://pokeapi.co/api/v2/pokemon-species/1"} />
        )

        expect(getByText("Evolves from Bulbasaur")).toBeInTheDocument();
        expect(container.querySelector("a[href='/1']")).toBeInTheDocument();
    });

});