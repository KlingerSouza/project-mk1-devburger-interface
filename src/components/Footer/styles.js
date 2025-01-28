import styled from "styled-components";

export const Container = styled.div`
height: 50px;
background: radial-gradient(circle, rgba(168,106,183,1) 0%, rgba(92,38,105,1) 100%);
width: 100vw;
display: flex;
justify-content: center;
align-items: center;


p{
    color: ${props => props.theme.white};
    font-size: 14px;
    font-weight: lighter;
}
`
