import React, { useState, useEffect } from 'react';
import Ethereum from 'services/ethereum';
import { Container, Header, Content, Info } from './styles';
import CurrentBalance from './CurrentBalance';

const Landing = () => {
  const [address, setAddress] = useState(
    `${process.env.ETHEREUM_WALLET_ADDRESS}`,
  );
  const [isValidAddress, setIsValidAddress] = useState(false);

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
            onChange={(e: any) => setAddress(e.target.value)}
            value={address}
          />
        </form>

        {isValidAddress && (
          <Info>
            <ul>
              <li>
                <CurrentBalance address={address} />
              </li>
            </ul>
          </Info>
        )}
      </Content>
    </Container>
  );
};

export default Landing;
