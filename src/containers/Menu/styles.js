import styled from "styled-components";

import BannerHamburger from "../../assets/banner-hamburger.svg";
import Background from '../../assets/background-form.svg'
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.darkWhite};
  background: linear-gradient(
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.6)
  ),
  url('${Background}');
`;

export const Banner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 360px;
  width: 100%;
  position: relative;
  background: url('${BannerHamburger}') no-repeat;
  background-color: ${(props) => props.theme.mainBlack};
  background-position: center;
  background-size: cover;

  h1 {
    font-family: "Road Rage", sans-serif;
    font-size: clamp(40px, 8vw, 80px);
    line-height: 1.2;
    color: ${(props) => props.theme.white};
    position: absolute;
    right: 10%;
    top: 20%;
    text-align: center;

    span {
      display: block;
      color: white;
      font-size: 20px;
    }
  }

  @media (max-width: 768px) {
    height: 250px;
    h1 {
      font-size: clamp(30px, 6vw, 60px);
      right: 5%;
      top: 25%;
    }
  }
`;

export const CategoryMenu = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 30px;
  flex-wrap: wrap;
`;

export const CategoryButton = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  background: none;
  color: ${(props) => (props.$isActiveCategory ? props.theme.purple : '#3A3A3A')};
  font-size: 24px;
  font-weight: 500;
  padding-bottom: 5px;
  line-height: 20px;
  border-bottom: ${(props) => (props.$isActiveCategory ? `2px solid ${props.theme.purple}` : 'none')};
`;

export const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  padding: 40px;
  justify-content: center;
  max-width: 1280px;
  gap: 80px 45px;
  margin: 30px auto auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    padding: 20px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
    gap: 60px 20px;
    padding: 15px;
  }
`;

