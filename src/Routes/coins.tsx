import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 50px;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: #e17055;
  color: ${(props) => props.theme.textColor};
  padding: 20px;
  margin: 10px 0;
  border-radius: 20px;
  a {
    transition: color 0.2s ease-in;
    display: block;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Loader = styled.div`
  text-align: center;
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>코코로인 </title>
      </Helmet>
      <Header>
        <Title>coin</Title>
      </Header>
      {isLoading ? (
        <Loader>LOLOLOLading</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin: ICoin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {`${coin.name}`} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;
