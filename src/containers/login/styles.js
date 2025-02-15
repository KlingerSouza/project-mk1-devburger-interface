import styled from "styled-components";
import { Link as ReactLink } from "react-router-dom";

import BackgroundLogin from '../../assets/background-login.svg';
import Background from '../../assets/background-form.svg';

export const Container = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;

export const LeftContainer = styled.div`
    background: url('${BackgroundLogin}');
    background-size: cover;
    height: 100%;
    width: 100%;
    max-width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 65%;
    }

    @media (max-width: 1024px) {
        max-width: 40%;
    }

    @media (max-width: 768px) {
        display: none;
    }
`;

export const RightContainer = styled.div`
    background: url('${Background}');
    background-color: #1E1E1E;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
    max-width: 50%;
    padding: 20px;

    p {
        color: ${props => props.theme.white};
        font-size: 18px;
        font-weight: 800;
        text-align: center;

        a {
            text-decoration: underline;
        }
    }

    @media (max-width: 1024px) {
        max-width: 60%;
    }

    @media (max-width: 768px) {
        max-width: 100%;
    }
`;

export const Title = styled.h2`
    font-family: "Road Rage", sans-serif;
    font-size: 40px;
    color: ${props => props.theme.white};
    text-align: center;

    span {
        font-family: "Road Rage", sans-serif;
        color: ${props => props.theme.purple};
    }

    @media (max-width: 768px) {
        font-size: 32px;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    width: 100%;
    max-width: 400px;

    @media (max-width: 768px) {
        max-width: 300px;
    }
`;

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;

    input {
        width: 100%;
        border: none;
        height: 52px;
        border-radius: 5px;
        padding: 0 16px;
    }

    label {
        font-size: 18px;
        font-weight: 600;
        color: ${props => props.theme.white};
    }

    p {
        font-size: 14px;
        line-height: 80%;
        color: ${props => props.theme.darkRed};
        font-weight: 600;
        height: 10px;
    }
`;

export const Link = styled(ReactLink)`
    text-decoration: none;
    color: ${props => props.theme.white};
`;
