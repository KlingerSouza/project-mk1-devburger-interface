import styled from "styled-components";

export const Container = styled.div`
.carousel-item{
    padding-right: 40px;
    margin: 100px 0 100px 0;
}

overflow-x: hidden;

.react-multiple-carousel__arrow--right {
    right: calc(5% + 0px);
    top: 105px;
}

.react-multiple-carousel__arrow--left {
    left: calc(0% + 5px);
    top: 105px;
}

padding-left: 40px;
`

export const Title = styled.h2`
font-size: 32px;
font-weight: 800;
color: ${props => props.theme.green};
padding-bottom: 12px;
position: relative;
text-align: center;
padding: 80px 0 0 0;
cursor: default;

&::after{
    content: '';
    position: absolute;
    bottom: 0;
    width: 56px;
    height: 4px;
    background-color: ${props => props.theme.green};
    left: calc(50% - 28px);
}
`