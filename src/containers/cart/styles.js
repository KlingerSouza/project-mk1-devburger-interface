import styled from "styled-components";

import Background from '../../assets/background-form.svg'
import Texture from "../../assets/texture.svg";

export const Container = styled.div`
width: 100%;
min-height: 100vh;

background:linear-gradient(
    rgba(255,255,255, .6),
    rgba(255,255,255, .6)
),
url('${Background}');
`
export const Banner = styled.div`
background:url('${Texture}') ;
background-size: cover;
background-position: center;
display: flex;
align-items:center;
justify-content: center;
position: relative;

height: 180px;

img{
    width: 180px;
    height: 165.44px;
}
`
export const Title = styled.div`
font-size:32px;
font-weight: 800;
line-height: 48px;
display: flex;
justify-content: center;
align-items: center;
padding-bottom:12px;
color: ${props => props.theme.green};
text-align: center;
position: relative;

&::after{
    position: absolute;
    left: calc(50% + -28px);
    bottom: 0;
    content: '';
    width:56px ;
    height: 4px;
    background-color: ${props => props.theme.green};
}
`
export const Content = styled.div`
display: grid;
grid-template-columns: 1fr 30%;
width: 100%;
max-width: 1280px;
padding: 40px;
margin: 0 auto;
gap: 20px;
`