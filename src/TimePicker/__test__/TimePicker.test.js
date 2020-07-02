import React from 'react';
import {render, fireEvent, cleanup} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import testIDs from "./testIDs"
import TimePicker from "../index";
import { setTimeWithZero } from "../TimePickerFunctions/functions";

describe("TimePicker rendering", () => {
    it("should render without crashing", () => {
        const {queryByTestId} = render(<TimePicker hour={2}/>);

        const timePicker = queryByTestId(testIDs.TimePicker);
        expect(timePicker).toBeInTheDocument();
    })

    it("should render without onChange func and not crashing", () => {
        const {queryByTestId} = render(<TimePicker hour={2}/>);

        const timePicker = queryByTestId(testIDs.TimeInputHours);
        fireEvent.change(timePicker, {target: {value: "06"}});

        expect(timePicker).toBeInTheDocument();
    })

    it("should render without onChange func and change the calue", () => {
        const {queryByTestId} = render(<TimePicker hour={2}/>);

        const timePicker = queryByTestId(testIDs.TimeInputHours);
        fireEvent.change(timePicker, {target: {value: "06"}});
        
        expect(timePicker.value).toBe("06");
    });

    it("should render with the correct label", () => {
        const {queryByText} = render(<TimePicker label={"test"}/>);

        expect(queryByText("test")).toBeInTheDocument();
    })

    
    it("should render with the correct error label", () => {
        const {queryByText} = render(<TimePicker errorMessage={"test"} isError/>);

        expect(queryByText("test")).toBeInTheDocument();
    })

    
    it("should render with the correct values", () => {
        const {queryByTestId} = render(<TimePicker hour={2} minute={15} second={5}/>);

        const secondsInput = queryByTestId(testIDs.TimeInputSeconds);
        const minutesInput = queryByTestId(testIDs.TimeInputMinutes);
        const hoursInput = queryByTestId(testIDs.TimeInputHours);

        expect(secondsInput.value).toBe("05");
        expect(minutesInput.value).toBe("15");
        expect(hoursInput.value).toBe("02");
    });

    it("should render diabled", () => {
        const {queryByTestId} = render(<TimePicker hour={2} minute={15} second={5} isDisabled/>);

        const secondsInput = queryByTestId(testIDs.TimeInputSeconds);
        const minutesInput = queryByTestId(testIDs.TimeInputMinutes);
        const hoursInput = queryByTestId(testIDs.TimeInputHours);

        expect(secondsInput).toBeDisabled();
        expect(minutesInput).toBeDisabled();
        expect(hoursInput).toBeDisabled();
    });

    it("should render without seconds", () => {
        const {queryByTestId} = render(<TimePicker hour={2} minute={15} second={5} withSeconds={false}/>);

        const secondsInput = queryByTestId(testIDs.TimeInputSeconds);

        expect(secondsInput).not.toBeInTheDocument();
    });

    it("should render with the correct values after zero fixing", () => {
        const {queryByTestId} = render(<TimePicker hour={7} minute={3} second={5}/>);

        const secondsInput = queryByTestId(testIDs.TimeInputSeconds);
        const minutesInput = queryByTestId(testIDs.TimeInputMinutes);
        const hoursInput = queryByTestId(testIDs.TimeInputHours);

        expect(secondsInput.value).toBe("05");
        expect(minutesInput.value).toBe("03");
        expect(hoursInput.value).toBe("07");
    });

    it("should call onChange func", () => {
        const jestFn = jest.fn();

        const {queryByTestId} = render(<TimePicker hour={3} minute={15} second={5}/>);
        const hoursInput = queryByTestId(testIDs.TimeInputHours);

        fireEvent.change(hoursInput, {target: {value: "02"}});
        expect(hoursInput.value).toBe("02");
    });

    it("should render with validate inputs value (stay the same)", () => {
        const {queryByTestId} = render(<TimePicker hour={7} minute={3} second={5}/>);

        const secondsInput = queryByTestId(testIDs.TimeInputSeconds);
        const minutesInput = queryByTestId(testIDs.TimeInputMinutes);
        const hoursInput = queryByTestId(testIDs.TimeInputHours);

        fireEvent.change(secondsInput, {target: {value: "a"}});
        fireEvent.change(minutesInput, {target: {value: "b"}});
        fireEvent.change(hoursInput, {target: {value: "c"}});


        expect(secondsInput.value).toBe("05");
        expect(minutesInput.value).toBe("03");
        expect(hoursInput.value).toBe("07");
    });

    it("should inc value by 1", () => {
        const {queryByTestId} = render(<TimePicker hour={3} minute={15} second={5}/>);
        const hoursInput = queryByTestId(testIDs.TimeInputHours);
        const hoursInputArrowUp = queryByTestId(testIDs.TimeInputHours + testIDs.TimeInputArrowUp);
        
        fireEvent.click(hoursInputArrowUp);
        expect(hoursInput.value).toBe("04");
    });

    it("should dec value by 1", () => {
        const {queryByTestId} = render(<TimePicker hour={3} minute={15} second={5}/>);
        const hoursInput = queryByTestId(testIDs.TimeInputHours);
        const hoursInputArrowDown = queryByTestId(testIDs.TimeInputHours + testIDs.TimeInputArrowDown);
        fireEvent.click(hoursInputArrowDown);
        expect(hoursInput.value).toBe("02");
    });

    it("should change value to top limit", () => {
        const {queryByTestId} = render(<TimePicker hour={0} minute={0} second={0}/>);

        const secondsInput = queryByTestId(testIDs.TimeInputSeconds);
        const minutesInput = queryByTestId(testIDs.TimeInputMinutes);
        const hoursInput = queryByTestId(testIDs.TimeInputHours);
        
        const secondsInputArrowDown = queryByTestId(testIDs.TimeInputSeconds + testIDs.TimeInputArrowDown);
        const minutesInputArrowDown = queryByTestId(testIDs.TimeInputMinutes + testIDs.TimeInputArrowDown);
        const hoursInputArrowDown = queryByTestId(testIDs.TimeInputHours + testIDs.TimeInputArrowDown);
        
        fireEvent.click(secondsInputArrowDown);
        fireEvent.click(minutesInputArrowDown);
        fireEvent.click(hoursInputArrowDown);

        expect(secondsInput.value).toBe("59");
        expect(minutesInput.value).toBe("59");
        expect(hoursInput.value).toBe("23");
    });

    it("should change value to bottom limit", () => {
        const {queryByTestId} = render(<TimePicker hour={23} minute={59} second={59}/>);

        const secondsInput = queryByTestId(testIDs.TimeInputSeconds);
        const minutesInput = queryByTestId(testIDs.TimeInputMinutes);
        const hoursInput = queryByTestId(testIDs.TimeInputHours);
        
        const secondsInputArrowUp = queryByTestId(testIDs.TimeInputSeconds + testIDs.TimeInputArrowUp);
        const minutesInputArrowUp = queryByTestId(testIDs.TimeInputMinutes + testIDs.TimeInputArrowUp);
        const hoursInputArrowUp = queryByTestId(testIDs.TimeInputHours + testIDs.TimeInputArrowUp);
        
        fireEvent.click(secondsInputArrowUp);
        fireEvent.click(minutesInputArrowUp);
        fireEvent.click(hoursInputArrowUp);

        expect(secondsInput.value).toBe("00");
        expect(minutesInput.value).toBe("00");
        expect(hoursInput.value).toBe("00");
    });

    it("should reset time to current time", () => {
        const {queryByTestId} = render(<TimePicker hour={7} minute={3} second={5}/>);

        let dateTime = new Date();
        const TimePickerResetButton = queryByTestId(testIDs.TimePickerResetButton)
        fireEvent.click(TimePickerResetButton);

        const secondsInput = queryByTestId(testIDs.TimeInputSeconds);
        const minutesInput = queryByTestId(testIDs.TimeInputMinutes);
        const hoursInput = queryByTestId(testIDs.TimeInputHours);

        expect(secondsInput.value).toBe(
            setTimeWithZero(dateTime.getSeconds()).toString()
        );
        expect(minutesInput.value).toBe(
            setTimeWithZero(dateTime.getMinutes()).toString()
            
        );
        expect(hoursInput.value).toBe(
            setTimeWithZero(dateTime.getHours()).toString()
        );
    })

    afterEach(cleanup);
})