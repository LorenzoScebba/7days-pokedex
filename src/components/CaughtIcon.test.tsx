import {render, fireEvent} from "@testing-library/react";
import CaughtIcon from "./CaughtIcon";

describe('Given i want to render the caught icon', function () {

    it('should render the icon "star_outline" if not caught', function () {
        const fn = jest.fn();

        const {getByText} = render(
            <CaughtIcon onToggle={fn} caught={false} />
        )

        expect(getByText("star_outline")).toBeInTheDocument();
    });

    it('should render the icon "star_outline" if caught', function () {
        const fn = jest.fn();

        const {getByText} = render(
            <CaughtIcon onToggle={fn} caught={true} />
        )

        expect(getByText("star")).toBeInTheDocument();
    });

    it('should trigger the "onToggle" function when clicked', function () {
        const fn = jest.fn();

        const {getByText} = render(
            <CaughtIcon onToggle={fn} caught={false} />
        )

        fireEvent.click(getByText("star_outline"))

        expect(fn).toBeCalledTimes(1);
    });
});