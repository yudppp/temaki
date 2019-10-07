import * as React from 'react'
import styled, { css } from '~/modules/theme'

type Props = {
    type?: string
    value?: string
    name?: string
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    errorMessage?: string
} & OuterProps
export const Presenter: React.FC<Props> = ({ children: _, ...props }) => {
    return (
        <Wrapper>
            <Outer {...props} />
            {renderErrorMessage(props.errored, props.errorMessage)}
        </Wrapper>
    )
}

function renderErrorMessage(errored?: boolean, errorMessage?: string) {
    if (errored && errorMessage) {
        return <ErrorMessage>{errorMessage}</ErrorMessage>
    }
    return null
}

const Wrapper = styled.div``

type OuterProps = {
    errored?: boolean
}
const Outer = styled.input<OuterProps>`
    padding: 10px 12px;
    border-radius: 6px;
    border: solid 1px ${props => props.theme.colors.grayScale.S10};
    transition: 0.15s border-color;

    ${props =>
        props.errored &&
        css`
            border-color: ${props.theme.colors.utilities.red};
        `}

    &:focus {
        outline: none;
        border-color: ${props => props.theme.colors.utilities.highlightGreen};
    }

    &::placeholder {
        color: ${props => props.theme.colors.grayScale.S20};
    }
`

const ErrorMessage = styled.p`
    color: ${props => props.theme.colors.utilities.red};
    padding-top: 4px;
`
