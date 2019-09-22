import React, { useState, useEffect } from 'react';
import Ethereum from 'services/ethereum';
import { Container, Header, Content, Info } from './styles';

const Landing = () => {
  const [address, setAddress] = useState('');
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    setIsValidAddress(Ethereum.isValidAddress(address));
  }, [address]);

  useEffect(() => {
    if (isValidAddress) {
      Ethereum.walletBalance(address).then(setBalance);
    }
  }, [isValidAddress, address]);

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
                <label htmlFor="balance">Balance:</label>
                <span id="balance">
                  {balance ? `${balance.substr(0, 8)} Ether` : '--'}
                </span>
              </li>
            </ul>
          </Info>
        )}
      </Content>
    </Container>
  );
};

export default Landing;
