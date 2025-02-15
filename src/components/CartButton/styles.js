import styled from "styled-components";

export const ContainerButton = styled.button`
    background-color: ${(props) => props.theme.purple};
    width: 90%; 
    height: 52px;
    border: 0;
    border-radius: 5px;
    font-size: 30px;
    color: white;
    transition: transform 0.1s ease-in-out;
    position: relative;
    z-index: 2; 
    &.animate {
        animation: vibrate 0.3s ease-in-out;
    }

    &:hover {
        background-color: ${(props) => props.theme.secondDarkPurple};
    }

    @keyframes vibrate {
        0% { transform: translateX(0); }
        25% { transform: translateX(-2px); }
        50% { transform: translateX(2px); }
        75% { transform: translateX(-2px); }
        100% { transform: translateX(0); }
    }

    @media (max-width: 768px) {
        height: 45px;
        font-size: 24px;
        width: 80%; 
    }

    @media (max-width: 480px) {
        height: 40px;
        font-size: 20px;
        width: 75%; 
    }
`;
