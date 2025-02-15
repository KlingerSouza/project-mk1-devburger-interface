import styled from "styled-components";
import BannerHome from '../../assets/banner-home.svg'
import Background from '../../assets/background-form.svg'

export const Banner = styled.div`
  background: url('${BannerHome}');
  background-size: cover;
  background-position: center;
  height: 310px;
  position: relative;

  h1 {
    font-family: "Road Rage", sans-serif;
    font-size: 80px;
    color: ${props => props.theme.white};
    position: absolute;
    right: 20%;
    top: 10%;
    cursor: default;

    @media (max-width: 1024px) {
      font-size: 60px;
      right: 10%;
    }

    @media (max-width: 768px) {
      font-size: 40px;
      right: 5%;
      top: 20%;
    }

    @media (max-width: 480px) {
      font-size: 30px;
      text-align: center;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
    }
  }
`;

export const Container = styled.section`
  background: linear-gradient(
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.6)
  ), url('${Background}');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;
