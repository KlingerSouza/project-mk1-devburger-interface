import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
    background: ${(props) => props.theme.gradientBlack};
    width: 100%;
    height: 72px;
    padding: 0 20px;

    @media (max-width: 768px) {
        padding: 0 10px;
    }
`;

export const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1280px;
`;

export const Navigation = styled.nav`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 72px;

    div {
        margin-left: 56px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;

        hr {
            height: 24px;
            border: 1px solid ${(props) => props.theme.darkGray};
        }
    }

    @media (max-width: 768px) {
        div {
            margin-left: 24px;
            gap: 10px;
        }

        hr {
            height: 16px;
        }
    }
`;

export const HeaderLink = styled(Link)`
    color: ${(props) =>
        props.$isActive ? props.theme.purple : props.theme.white};
    text-decoration: none;
    font-size: 14px;
    transition: color 200ms;

    &:hover {
        color: ${(props) => props.theme.purple};
    }

    @media (max-width: 768px) {
        font-size: 8px;
    }
`;

export const Options = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 48px;

    @media (max-width: 768px) {
        gap: 24px;
    }
`;

export const Profile = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;

    .profile-icon {
        color: ${(props) => props.theme.white};
    }

    div {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;
    }

    p {
        color: ${(props) => props.theme.white};
        line-height: 90%;
        font-weight: 300;

        span {
            font-weight: 700;
            color: ${(props) => props.theme.purple};
        }
    }

    @media (max-width: 768px) {
        font-size: 8px;
        gap: 8px;

        div {
            gap: 10px;
        }
    }
`;

export const LinkContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    .cart-link {
        color: ${(props) => props.theme.white};
        cursor: pointer;
        transition: 200ms;

        &:hover {
            color: ${(props) => props.theme.purple};
        }
    }

    @media (max-width: 768px) {
        gap: 10px;
    }
`;

export const Logout = styled.button`
    color: ${(props) => props.theme.red};
    text-decoration: none;
    font-weight: 700;
    background-color: transparent;
    border: none;
    transition: 200ms;

    &:hover {
        text-decoration: underline;
        opacity: 0.8;
    }

    @media (max-width: 768px) {
        font-size: 8px;
    }
`;
