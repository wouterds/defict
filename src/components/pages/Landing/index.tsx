import React, { useState, useEffect } from 'react';
import Ethereum from 'services/ethereum';
import { Container, Header, Content, Info } from './styles';
import CurrentBalance from './CurrentBalance';
import HistoricalBalance from './HistoricalBalance';

const Landing = () => {
  const [address, setAddress] = useState(
    `${process.env.ETHEREUM_WALLET_ADDRESS}`,
  );
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [priceInUSD, setPriceInUSD] = useState<number | null>(null);

  useEffect(() => {
    Ethereum.getPriceInUSD().then(setPriceInUSD);

    const interval = setInterval(
      () => Ethereum.getPriceInUSD().then(setPriceInUSD),
      5000,
    );

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsValidAddress(Ethereum.isValidAddress(address));
  }, [address]);

  return (
    <Container>
      <Header>
        <h1>Ethereum Wallet Info</h1>
        {isValidAddress && <h2>{address}</h2>}
      </Header>
      <Content>
        <form>
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            placeholder="Enter ethereum address"
            onChange={(e: any) => {
              setIsValidAddress(false);
              setAddress(e.target.value);
            }}
            value={address}
          />
        </form>

        {isValidAddress && (
          <Info>
            <ul>
              <li>
                <CurrentBalance address={address} priceInUSD={priceInUSD} />
              </li>
              <li>
                <HistoricalBalance
                  address={address}
                  days={30}
                  priceInUSD={priceInUSD}
                />
              </li>
            </ul>
          </Info>
        )}
      </Content>
    </Container>
  );
};

export default Landing;
