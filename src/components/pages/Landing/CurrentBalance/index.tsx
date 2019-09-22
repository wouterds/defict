import React, { useEffect, useState } from 'react';
import Ethereum from 'services/ethereum';

interface Props {
  address: string;
}

const CurrentBalance = (props: Props) => {
  const { address } = props;
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    Ethereum.walletBalance(address).then(setBalance);
  }, [address]);

  return (
    <>
      <label htmlFor="balance">Current balance:</label>
      <span id="balance">
        {balance ? `${balance.substr(0, 8)} Ether` : '--'}
      </span>
    </>
  );
};

export default CurrentBalance;
