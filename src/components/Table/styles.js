import styled from 'styled-components';

export const Root = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 20px;
  overflow-x: auto;
  display: block;
`;

export const Header = styled.thead``;

export const Tr = styled.tr``;

export const Th = styled.th`
  padding: 14px;
  text-align: left;
  color: white;
  background-color: ${(props) => props.theme.secondBlack};
  border-bottom: 1px solid ${(props) => props.theme.lightGray};

  &:first-child {
    border-top-left-radius: 20px;
  }

  &:last-child {
    border-top-right-radius: 20px;
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }
`;

export const Td = styled.td`
  padding: 16px;
  color: ${(props) => props.theme.secondBlack};
  font-weight: 500;
  line-height: 115%;

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 14px;
  }
`;

export const Body = styled.tbody``;

