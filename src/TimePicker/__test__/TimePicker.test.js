import React from 'react';
import {render, fireEvent, cleanup, queryByText} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import testIDs from "./testIDs"
import TimePicker from "../index";
import { setTimeWithZero } from "../TimePickerFunctions/functions";

describe("TimePicker rendering", () => {
    it("should render without crashing", () => {
        const {queryByTestId} = render(<TimePicker hour={2}/>);

        const TP = queryByTestId(testsIDs.TimePicker);
        expect(TP).toBeInDocument();
    })

    it("should render without onChange func and not crashing", () => {
        const {queryByTestId} = render(<TimePicker hour={2}/>);

        const TP = queryByTestId(testsIDs.TimeInputHours);
        fireEvent.change(TP, {target: {value: "06"}});

        expect(TP).toBeInDocument();
    })

    it("should render without onChange func and change the calue", () => {
        const {queryByTestId} = render(<TimePicker hour={2}/>);

        const TP = queryByTestId(testsIDs.TimeInputHours);
        fireEvent.change(TP, {target: {value: "06"}});
        
        expect(TP.value).toBe("06");
    });

    it("should render with the correct label", () => {
        const {queryByText} = render(<TimePicker label={"test"}/>);

        expect(queryByText("test")).toBeInDocument();
    })

    
    it("should render with the correct error label", () => {
        const {queryByText} = render(<TimePicker errorMessage={"test"} isError/>);

        expect(queryByText("test")).toBeInDocument();
    })

    
    it("should render with the correct values", () => {
        const {queryByTestId} = render(<TimePicker hour={2} minute={15} second={5}/>);

        const secondsInput = queryByTestId(testTDs.TimeInputSeconds);
        const minutesInput = queryByTestId(testTDs.TimeInputMinutes);
        const hoursInput = queryByTestId(testTDs.TimeInputHours);

        expect(secondsInput).toBe("05");
        expect(minutesInput).toBe("15");
        expect(hoursInput).toBe("02");
    });

    it("should render diabled", () => {
        const {queryByTestId} = render(<TimePicker hour={2} minute={15} second={5} isDisabled/>);

        const secondsInput = queryByTestId(testTDs.TimeInputSeconds);
        const minutesInput = queryByTestId(testTDs.TimeInputMinutes);
        const hoursInput = queryByTestId(testTDs.TimeInputHours);

        expect(secondsInput).toBeDisabled();
        expect(minutesInput).toBeDisabled();
        expect(hoursInput).toBeDisabled();
    });

    it("should render without seconds", () => {
        const {queryByTestId} = render(<TimePicker hour={2} minute={15} second={5}/>);

        const secondsInput = queryByTestId(testTDs.TimeInputSeconds);

        expect(secondsInput).not.toBeInDocument();
    });

    it("should render with the correct values after zero fixing", () => {
        const {queryByTestId} = render(<TimePicker hour={7} minute={3} second={5}/>);

        const secondsInput = queryByTestId(testTDs.TimeInputSeconds);
        const minutesInput = queryByTestId(testTDs.TimeInputMinutes);
        const hoursInput = queryByTestId(testTDs.TimeInputHours);

        expect(secondsInput).toBe("05");
        expect(minutesInput).toBe("03");
        expect(hoursInput).toBe("07");
    });

    it("should call onChange func", () => {
        const jestFn = jest.fn();

        const {queryByTestId} = render(<TimePicker hour={3} minute={15} second={5}/>);
        const hoursInput = queryByTestId(testTDs.TimeInputHours);

        fireEvent.change(hoursInput, {target: {value: "02"}});
        expect(hoursInput).toBe("02");
    });

    it("should render with validate inputs value (stay the same)", () => {
        const {queryByTestId} = render(<TimePicker hour={7} minute={3} second={5}/>);

        const secondsInput = queryByTestId(testTDs.TimeInputSeconds);
        const minutesInput = queryByTestId(testTDs.TimeInputMinutes);
        const hoursInput = queryByTestId(testTDs.TimeInputHours);

        fireEvent.change(secondsInput, {target: {value: "a"}});
        fireEvent.change(minutesInput, {target: {value: "b"}});
        fireEvent.change(hoursInput, {target: {value: "c"}});


        expect(secondsInput).toBe("05");
        expect(minutesInput).toBe("03");
        expect(hoursInput).toBe("07");
    });

    it("should inc value by 1", () => {
        const {queryByTestId} = render(<TimePicker hour={3} minute={15} second={5}/>);
        const hoursInput = queryByTestId(testTDs.TimeInputHours);
        const hoursInputArrowUp = queryByTestId(testTDs.TimeInputHours + testTDs.TimeInputArrowUp);
        
        fireEvent.click(hoursInputArrowUp);
        expect(hoursInput).toBe("04");
    });

    it("should dec value by 1", () => {
        const {queryByTestId} = render(<TimePicker hour={3} minute={15} second={5}/>);
        const hoursInput = queryByTestId(testTDs.TimeInputHours);
        const hoursInputArrowDown = queryByTestId(testTDs.TimeInputHours + testTDs.TimeInputArrowDown);
        
        fireEvent.click(hoursInputArrowDown);
        expect(hoursInput).toBe("02");
    });

    it("should change value to top limit", () => {
        const {queryByTestId} = render(<TimePicker hour={0} minute={0} second={0}/>);

        const secondsInput = queryByTestId(testTDs.TimeInputSeconds);
        const minutesInput = queryByTestId(testTDs.TimeInputMinutes);
        const hoursInput = queryByTestId(testTDs.TimeInputHours);
        
        const secondsInputArrowDown = queryByTestId(testTDs.TimeInputSeconds + testTDs.TimeInputArrowDown);
        const minutesInputArrowDown = queryByTestId(testTDs.TimeInputMinutes + testTDs.TimeInputArrowDown);
        const hoursInputArrowDown = queryByTestId(testTDs.TimeInputHours + testTDs.TimeInputArrowDown);
        
        fireEvent.click(secondsInputArrowDown);
        fireEvent.click(minutesInputArrowDown);
        fireEvent.click(hoursInputArrowDown);

        expect(secondsInput).toBe("59");
        expect(minutesInput).toBe("59");
        expect(hoursInput).toBe("23");
    });

    it("should change value to bottom limit", () => {
        const {queryByTestId} = render(<TimePicker hour={23} minute={59} second={59}/>);

        const secondsInput = queryByTestId(testTDs.TimeInputSeconds);
        const minutesInput = queryByTestId(testTDs.TimeInputMinutes);
        const hoursInput = queryByTestId(testTDs.TimeInputHours);
        
        const secondsInputArrowUp = queryByTestId(testTDs.TimeInputSeconds + testTDs.TimeInputArrowUp);
        const minutesInputArrowUp = queryByTestId(testTDs.TimeInputMinutes + testTDs.TimeInputArrowUp);
        const hoursInputArrowUp = queryByTestId(testTDs.TimeInputHours + testTDs.TimeInputArrowUp);
        
        fireEvent.click(secondsInputArrowUp);
        fireEvent.click(minutesInputArrowUp);
        fireEvent.click(hoursInputArrowUp);

        expect(secondsInput).toBe("00");
        expect(minutesInput).toBe("00");
        expect(hoursInput).toBe("00");
    });

    it("should reset time to current time", () => {
        const {queryByTestId} = render(<TimePicker hour={7} minute={3} second={5}/>);

        let dateTime = new Date();
        const TimePickerResetButton = queryByTestId(testIDs.TimePickerResetButton)
        fireEvent.click(TimePickerResetButton);

        const secondsInput = queryByTestId(testTDs.TimeInputSeconds);
        const minutesInput = queryByTestId(testTDs.TimeInputMinutes);
        const hoursInput = queryByTestId(testTDs.TimeInputHours);

        expect(secondsInput.value).toBe(
            setTimeWithZero(dateTime.getSeconds()).toString()
        );
        expect(minutesInput).toBe(
            setTimeWithZero(dateTime.getMinutes()).toString()
            
        );
        expect(hoursInput).toBe(
            setTimeWithZero(dateTime.getHours()).toString()
        );
    })

    afterEach(cleanup);
})