import {render} from "@testing-library/react";
import PokemonBasicContent from "./PokemonBasicContent";

describe('Given i want to render pokemon basic content', function () {

    it('should render the informations passed to the component', function () {
        const {getByText} = render(
            <PokemonBasicContent name={"Bulbasaur"} description={"The description for Bulbasaur"} id={"1"} />
        )

        expect(getByText("Bulbasaur (#1)")).toBeInTheDocument();
        expect(getByText("The description for Bulbasaur")).toBeInTheDocument();
    });

    it('should fallback to the default description if not provided', function () {
        const {getByText} = render(
            <PokemonBasicContent name={"Bulbasaur"} id={"1"} />
        )

        expect(getByText("Bulbasaur (#1)")).toBeInTheDocument();
        expect(getByText("The description for this pokemon is not available")).toBeInTheDocument();
    });

});