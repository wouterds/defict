import React, { useEffect, useState } from 'react';
import Ethereum from 'services/ethereum';

interface Props {
  address: string;
}

const CurrentBalance = (props: Props) => {
  const { address } = props;
  const [balance, setBalance] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    Ethereum.walletBalance(address).then(balance => {
      setBalance(balance);
      setIsLoading(false);
    });
  }, [address]);

  return (
    <>
      <label htmlFor="balance">Current balance:</label>

      {isLoading && 'loading..'}
      {!isLoading && (
        <span id="balance">
          {balance ? `${balance.substr(0, 8)} Ether` : '--'}
        </span>
      )}
    </>
  );
};

export default CurrentBalance;
