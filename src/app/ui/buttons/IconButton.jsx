import styled from 'styled-components';

const Button = styled.button`
    width: ${(props) => props.size || '40px'};
    height: ${(props) => props.size || '40px'};
    border-radius: ${(props) => props.borderRadius || '100%'};
    background-color: ${(props) => (props.disabled ? props.theme.colors.disabled : props.backgroundColor || props.theme.colors.background)};
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    opacity: ${(props) => (props.disabled ? '0.8' : '1')};
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    ${(props) => props.hover && !props.disabled && `
        &:hover {
            background-color: #ddd;
        }
    `}
`;

const Image = styled.img`
    width: 60%;
`;

export default function IconButton({ size, onClick, icon, disabled, borderRadius, backgroundColor, hover }) {
    const imageRoute = `/icons/${icon}`;

    return (
        <Button
            size={size}
            onClick={!disabled ? onClick : undefined}
            disabled={disabled}
            borderRadius={borderRadius}
            backgroundColor={backgroundColor}
            hover={hover}
        >
            <Image src={imageRoute} alt="icono" />
        </Button>
    );
}
