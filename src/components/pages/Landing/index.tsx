import React, { useState, useEffect } from 'react';
import Ethereum from 'services/ethereum';

const Landing = () => {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    if (Ethereum.isValidAddress(address)) {
      Ethereum.walletBalance(address).then(setBalance);
    }
  }, [address]);

  return (
    <div>
      <h1>Ethereum balance{balance && `: ${balance} ETH`}</h1>
      <form>
        <input
          type="text"
          placeholder="Ethereum address"
          onChange={(e: any) => setAddress(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Landing;
