import styled from "styled-components";

export const Section = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Container = styled.div`
    background-color: white;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

    * {
        color: ${(props) => props.theme.secondBlack};
        font-weight: 500;
    }

    .container-top {
        display: grid;
        grid-gap: 10px;
        grid-template-areas: 
            'title title'
            'items items-price'
            'delivery-tax delivery-tax-price';

        p {
            padding: 0 25px;
        }

        .title {
            grid-column: span 2;
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 10px;
            background-color: ${(props) => props.theme.secondBlack};
            color: white;
            width: 100%;
            height: 45px;
            padding: 12px 15px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }

        .items {
            grid-area: items;
        }
        .items-price {
            grid-area: items-price;
        }
        .delivery-tax {
            grid-area: delivery-tax;
        }
        .delivery-tax-price {
            grid-area: delivery-tax-price;
        }
    }

    .container-bottom {
        display: flex;
        justify-content: space-between;
        font-size: 20px;
        margin-top: 10px;
        padding: 10px 30px 20px 25px;
        border-top: 1px solid #ccc;

        * {
            font-weight: 700;
        }
    }
`;
