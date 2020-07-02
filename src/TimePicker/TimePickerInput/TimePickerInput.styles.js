import styled from "styled-components"
import { lighten } from 'polished'

export const StyledTimeInputWrapper = styled.div`
    display: grid;
    height: 100%;
    grid-template-rows: 30% 40% 30%;
    justify-items: center;
    align-items: center;

    .time-input__arrow-down {
        transform: rotate(180deg);
    };

    .time-input__arrow{
        font-size: 1.3em;

        &:hover{
            color: ${(props) => props.theme.colors.primary};
        }

        &:active {
            color: inherit;
        }
    }

    & > input {
        border-left: none;
        border-right: none;
    }

    &:first-child input {
        border-left: 1px solid ${props => props.theme.colors.primary}
    }

    &[data-isdisabled="true"] {
        & > input {
            border-color: ${props => props.theme.colors.disabled.primary}
        }
        
        .time-input__arrow {
            color: ${props => props.theme.colors.disabled.primary}
        }
    }
`;

export const StyledTimePickerInput = styled.input`
    outline: none;
    box-sizing: border-box;
    border: 1px solid ${props => props.theme.colors.primary};
    padding-top: 2px;
    text-align: center;
    width:100%;
    height: 100%;

    &::selection{
        color: ${props => props.theme.colors.primary};
        background-color: ${props => lighten(0.33, props.theme.colors.primary)}
    };

    &:focus{
        color: ${props => props.theme.colors.primary}
    }

    &:disabled {
        color: ${props => props.theme.colors.disabled.primary};
        background-color: ${props => props.theme.colors.disabled.secondary};
        border-color: ${props => props.theme.colors.disabled.primary};
    
        &::selection {
            all: unset;
        }
    
        &:focus {
            all:unset;
        };
    }
`;