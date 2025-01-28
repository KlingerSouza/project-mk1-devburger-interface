import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
.carousel-item{
    padding-right: 40px;
    margin:40px 0 0 0;
}

.react-multiple-carousel__arrow--right {
    right: calc(5% + 1px);
    top: 55px;
}

.react-multiple-carousel__arrow--left {
    left: calc(0% + 5px);
    top: 55px;
}


padding-left: 40px;
`

export const Title = styled.h2`
font-size: 32px;
font-weight: 800;
color: ${props => props.theme.purple};
padding-bottom: 12px;
position: relative;
text-align: center;
cursor: default;
padding: 40px 0 0;

&::after{
    content: '';
    position: absolute;
    bottom: 0;
    width: 56px;
    height: 4px;
    background-color: ${props => props.theme.purple};
    left: calc(50% - 28px);
    top: 90px;
}
`

export const ContainerItems = styled.div`
background: url('${(props) => props.imageurl}');
background-position:center;
background-size: cover;
border-radius: 20px;
cursor: pointer;

display: flex;
align-items: flex-end;
padding: 20px 10px;
width: 100%;
height: 250px;
`
export const CategoryButton = styled(Link)`
    color:${props => props.theme.white};
    background-color: rgba(0,0,0, .5);
    padding: 5px 20px;
    border-radius: 20px;
    font-size: 19.5px;
    font-weight: 500;
    text-decoration: none;

    &:hover{
        opacity: .8;
        background-color: ${props => props.theme.purple};
    }
`