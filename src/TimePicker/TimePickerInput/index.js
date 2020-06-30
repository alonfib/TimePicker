   import React, {useEffect} from 'react';
import { ThemeProvider } from 'styled-components';
// import useTheme
import {
    StyledTimeInputWrapper,
    StyledTimePickerInput
} from "./TimePickerInput.styles.js";
import {FaCaretUp} from 'react-icons/fa';
import {
    setTimeWithZero,
    checkLimit,
    validateInput,
    validateFirstNumber
} from "../TimePickerFunctions/functions";

const TimePickerInput = ({
    className,
    value,
    disabled,
    limit,
    inputRef,
    nextRef,
    prevRef,
    testId,
}) => {
    const theme = useTheme();

    const eventKeys = {
        ArrowUp: () => handleClick(1),
        ArrowDown: () => handleClick(-1),
        ArrowRight: () => nextFocus(nextRef),
        Enter: () => nextFocus(nextRef),
        ArrowLeft: () => nextFocus(prevRef)
    };

    useEffect(() => {
        if (inputRef) {
            if(inputRef.current.value.length === 1) {
                inputRef.current.selectionStarl = 1;
            } else {
                inputRef.current.selectionStart = 0;
            }
        }
    });

    const onKeyPress = (event) => {
        if (eventKeys.hasOwnProperty(event.key)) {
            return eventKeys[event.key]();
        };
    };

    const nextFocus = (ref) => {
        if (ref) {
            onChange(setTimeWithZero(intRef.current.value));
            ref.current.select();
        };
    };

    const handleChnge = event => {
        const input = event.target.value;
        if(validateInput(input, limit)) {
            if(validateFirstNumber(input, limit)) {
                onChange(setTimeWithZero(input));
                nextFocus(nextRef);
                return;
            };
            onChange(input);
            if(input.length ===2) {
                nextFocus(nextRef);
            }
        };
    };

    const handleClick = (step = 0) => {
        if (disabled) {
            return;
        };
        const newTime = value ? parseInt(value) + step : 0;
        const isLimit = checkLimit(newTime, limit);
        if (isLimit) {
            onChange(isLimit);
        } else {
            onChange(setTimeWithZero(newTime));
        };
        inputRef.current.select();
    };

    return (
        <ThemeProvider theme={theme}>
            <StyledTimeInputWrapper
                className="time-input-wrapper"
                data-isdisabled={disabled}
            >
                <FaCaretUp
                    className={"time-input__arrow time-input__arrow-up"}
                    onClick={() => handleClick(1)}
                    dta-testId={testId + testIds.TimeInputArrowUp}
                />
                <StyledTimePickerInput
                    value={value}
                    className={className}
                    onChange={(e) => handleChnge(e)}
                    onBlue={setTimeWithZero}
                    ref={inputRef}
                    onKeyp={onKeyPress}
                    disabled={disabled}
                    data-testId={testId}
                />
                <FaCaretUp
                    className={"time-input__arrow time-input__arrow-down"}
                    onClick={() => handleClick(-1)}
                    dta-testId={testId + testIds.TimeInputArrowDown}
                />
            </StyledTimeInputWrapper>
        </ThemeProvider>
    )
}

export default TimePickerInput