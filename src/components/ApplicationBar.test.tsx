import {render} from "@testing-library/react";
import ApplicationBar from "./ApplicationBar";
import {Router} from "wouter";

describe('Given i want to render the application bar', function () {

    it('should render the app name', function () {
        const {getByText} = render(
            <Router>
                <ApplicationBar />
            </Router>
        )

        expect(getByText("7Days Pokédex")).toBeInTheDocument();
    });

    it('the app name should link to the application root', function () {
        const {getByTestId} = render(
            <Router>
                <ApplicationBar />
            </Router>
        )

        expect(getByTestId("appbar-linkto-root")).toBeInTheDocument();
    });
});