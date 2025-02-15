import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding: 20px;
  border-radius: 8px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  position: relative;

  div {
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    p {
      font-size: 15px;
      color: ${(props) => props.theme.orange};
      line-height: 15px;
      font-weight: 500;
      margin-top: 40px; 
      text-align: center;
    }

    strong {
      font-size: 20px;
      color: ${(props) => props.theme.secondBlack};
      font-weight: 800;
      line-height: 20px;
      margin: 10px 0;
      text-align: center;
    }
  }

  @media (max-width: 768px) {
    gap: 20px;
    padding: 15px;

    div {
      p {
        font-size: 14px;
        margin-top: 25px;
      }
      strong {
        font-size: 14px;
      }
    }
  }

  @media (max-width: 480px) {
    gap: 10px;
    padding: 10px;

    div {
      p {
        font-size: 12px;
        margin-top: 20px;
      }
      strong {
        font-size: 12px;
      }
    }
  }
`;

export const CardImage = styled.img`
  height: 90px;
  position: absolute;
  top: -45px; 

  @media (max-width: 768px) {
    height: 75px;
    top: -35px;
  }

  @media (max-width: 480px) {
    height: 60px;
    top: -30px;
  }
`;
