import styled from "styled-components";
import BannerHome from '../../assets/banner-home.svg'
import Background from '../../assets/background-form.svg'

export const Banner = styled.div`
background: url('${BannerHome}');
background-size: cover;
background-position: center;
height: 310px;

h1{
    font-family: "Road Rage", sans-serif;
    font-size: 80px;
    color: ${props => props.theme.white} ;
    position: absolute;
    right: 20%;
    top: 10%;
    cursor: default;
}
`

export const Container = styled.section`

background:linear-gradient(
    rgba(255,255,255, .6),
    rgba(255,255,255, .6)
),
url('${Background}');
`