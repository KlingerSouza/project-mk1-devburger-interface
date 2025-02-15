import styled from "styled-components";

export const ProductImage = styled.img`
    height: 80px;
    width: 80px;
    border-radius: 16px;

    @media (max-width: 768px) {
        height: 60px;
        width: 60px;
    }

    @media (max-width: 480px) {
        height: 50px;
        width: 50px;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30px;
        width: 30px;
        color: white;
        border-radius: 4px;
        background-color: ${(props) => props.theme.purple};
        transition: all 0.4s;
        border: none;

        &:hover {
            background-color: #67357c;
        }

        @media (max-width: 768px) {
            height: 25px;
            width: 25px;
        }

        @media (max-width: 480px) {
            height: 20px;
            width: 20px;
        }
    }
`;

export const EmptyCart = styled.p`
    font-size: 20px;
    text-align: center;
    font-weight: 700;

    @media (max-width: 768px) {
        font-size: 18px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
    }
`;

export const TrashImage = styled.img`
    height: 20px;
    width: 20px;
    cursor: pointer;

    @media (max-width: 768px) {
        height: 18px;
        width: 18px;
    }

    @media (max-width: 480px) {
        height: 16px;
        width: 16px;
    }
`;
