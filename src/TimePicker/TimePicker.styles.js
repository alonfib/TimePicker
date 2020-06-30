import styled from "styled-components"
import { darken } from 'polished'

export const TimePickerWraper = styled.div`
    display: grid;
    text-align: center;
    width: min-content;
    grid-template-columns: max-content;
    align-items: center;
    font-size: ${props => props.theme.typography.defaultFontSize};
    grid-template-areas:
    "timepicker label"
    "error blank";

    &[data-isVertical="true"]{
        grid-template-areas: 
        "label"
        "timepicker"
        "error";
    };

    .time-picker-grid-wrapper__label {
        padding-left: 0;
    }

    .time-picker-grid-wrapper__label {
        grid-area: label;
        font-size: 1em;
        font-size: ${props => props.theme.typography.fontFamily};
        font-size: 0.7em;
    };
`;

export const StyledTimePicker = styled.div`
    grid-area: timepicker;
    position: relative;
    display: grid;
    justify-content: center;
    align-items: center;
    text-align: center;
    grid-template-columns: ${props => {
        `${props.withSeconds && "minmax(0, 1fr) 6px"} minmax(0, 1fr) 6px minmax(0, 1fr) 20%`
    }};
    width: ${props => props.size.width};
    height: ${props => props.size.height || "auto"};
    font-family: ${props => props.size.fontSize};
    min-width: 63px;

    .time-picker__hours-input {
        border-radius: 3px 0 0 3px;
    };

    &:after {
        content: "";
        position: absolute;
        top: 30%;
        left: 0;
        height: 40%;
        width: 100%;
        border-radius: 3px;
        z-index: -1;
        box-shadow: none;
        transition: all 0.2s ease-in-out;;

        &:focus-within {
            .time-picker__time--moz-user-input,
            .time-picker__label,
            .time-picker__icon-wrapper{
                transition: border 0.2s ease-in-out;
                border-color: ${props => props.theme.colors.primary}
            };

            &:after {
                box-shadow: 0px 0px 5px grey;
            }
        }

       &[data-iserror="true"] {
            .time-picker__time--moz-user-input,
            .time-picker__label,
            .time-picker__icon-wrapper {
                border-color: ${props => props.theme.colors.error} !important; 
            };

            &:after {
                box-shadow: 0px 0px 5px grey;
            };
       };
    }
`;

export const TimePickerIcon = styled.button`
    outline: none;
    width: auto;
    display: flex;
    height: 40%;
    justify-content: center;
    align-content: center;
    text-align: center;
    border: 1px solid ${props => props.theme.colors.primary};
    border-left: none;
    font-size: 0.8em;
    border-radius: 0 3px 3px 0;

    &:hover{
        color: ${props => props.theme.colors.primary};
    }

    &:active{
        color: inherit;
    }

    &[data-isdisabled="true"] {
        color: ${(props) => props.theme.colors.disabled.primary};
        background-color: ${props => darken(0.075, props.theme.colors.disabled.secondary)};
        border-color: ${props => props.theme.colors.disabled.primary};
    };
`;

export const TimeInputLabel = styled.label`
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
    height: 40%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    border-color: ${props => props.theme.colors.primary};

    &::selection {
        background-color: transparent;
    }

    &[data-isdisabled="true"]{
        color: ${props => props.theme.color.disabled.primary};
        background-color: ${props => props.theme.color.disabled.secondary};
        border-color: ${props => prpos.theme.colors.disabled.primary};
    }
`;

export const ErrorMessage = styled.label`
    font-size: ${props => props.theme.typography.fontFamily};
    color: ${props.theme.color.error};
    grid-area: error;
    font-size: 0.7em;
`;

