import React, {useState, useRef, useEffect, Fragment} from 'react';
import { ThemeProvider, useTheme } from 'styled-components';
import testIDs from "./__test__/testIDs";
import PropTypes from 'prop-types';
import { getTime, setTimeWithZero} from "./TimePickerFunctions/functions";

import { FaSyncAlt } from 'react-icons/fa';
import { isElement } from 'react-dom/test-utils';

const hoursLimit = 24;
const minutesLimit = 60;
const secondsLimit = 60;

const TimePicker = ({
    id,
    name,
    className,
    width,
    height,
    size,
    onChange,
    isDisabled,
    isError,
    errorMessage,
    isRequired,
    label,
    isVertical,
    seperationMark,
    hour,
    minute,
    second,
    withSeconds,
}) => {
    // const theme = useTheme();
    const [hours, setHours] = useState(getTime(hour, setHours));
    const [minutes, setMinutes] = useState(getTime(minute, setMinutes));
    const [seconds, setSeconds] = useState(getTime(second, setSeconds));
    const hoursRef = useRef(null);
    const minutesRef = useRef(null);
    const secondsRef = useRef(null);

    const resetTime = () => {
        let dateTime = new Date();
        setHours(setTimeWithZero(dateTime.getHours()));
        setMinutes(setTimeWithZero(dateTime.getMinutes()));
        setSeconds(setTimeWithZero(dateTime.getSeconds()));
    };

    useEffect(() => {
        onChange &&
        onChange(
            `${hours} ${seperationMark} 
            ${minutes} ${seperationMark} 
            ${withSeconds ? seconds : "00"}`
        );
    });

    return(
        <ThemeProvider theme={theme}>
            <TimePickerWrapper
                className={"time-picker-grid-wrapper"}
                data-isVertical={isVertical}
                data-testid={testIDs.TimePicker}
            >
                <label className="time-picker-grid-wrapper__label">
                    {`${isRequired && '*'} ${label}`}
                </label>
                <StyledTimePicker
                    className={`time-picker ${className}`}
                    id={id}
                    name={name}
                    style={{width, height}}
                    data-iserror={isError}
                    withSeconds={withSeconds}
                >
                    <TimePickerInput
                        className={'time-picker__time-input time-picker__hours-input'}
                        value={hours}
                        onChange={setHours}
                        inputRef={hoursRef}
                        limit={hoursLimit}
                        nextRef={minutesRef}
                        disabled={isDisabled}
                        testId={testIDs.TimeInputHours}
                    />
                    <TimeInputLabel
                        className="time-picker__label"
                        data-isdisabled={isDisabled}
                        >
                            {seperationMark}
                    </TimeInputLabel>
                    <TimePickerInput
                        className={'time-picker__time-input time-picker__minutes-input'}
                        value={minutes}
                        onChange={setMinutes}
                        inputRef={minutesRef}
                        limit={minutesLimit}
                        nextRef={secondsRef}
                        prevRef={hoursRef}
                        disabled={isDisabled}
                        testId={testIDs.TimeInputMinutes}
                    />
                    {withSeconds && (
                        <Fragment>
                            <TimeInputLabel
                                className="time-picker__label"
                                data-isdisabled={isDisabled}
                                >
                                    {seperationMark}
                            </TimeInputLabel>
                            <TimePickerInput
                                className={'time-picker__time-input time-picker__seconds-input'}
                                value={seconds}
                                onChange={setSeconds}
                                inputRef={secondsRef}
                                limit={secondsRef}
                                prevRef={minutesRef}
                                disabled={isDisabled}
                                testId={testIDs.TimeInputSeconds}
                                />
                        </Fragment>
                    )}
                    <TimePickerIcon
                        className={"time-picker__icon-wrapper"}
                        onClick={resetTime}
                        disabled={isDisabled}
                        data-isDisabled={isDisabled}
                        data-testid={testIDs.TimePickerResetButton}
                    >
                        <FaSyncAlt className={"time-picker__icon"}/>
                    </TimePickerIcon>
                </StyledTimePicker>
                {isError && <TimePickerErrorMessage>{errorMessage}</TimePickerErrorMessage>}
            </TimePickerWrapper>
        </ThemeProvider>
    );
};

let dateTime = new Date();

TimePicker.propTypes = {
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    seperationMark: PropTypes.string,
    withSeconds: PropTypes.bool
};

TimePicker.defaultProps = {
    errorMessage: "",
    isDisabled: false,
    seperationMark: ":",
    withSeconds: true,
    hour: dateTime.getHours(),
    minute: dateTime.getMinutes(),
    second: dateTime.getSeconds()
};

export default TimePicker;