import React, { useEffect, useState } from 'react';
import Ethereum from 'services/ethereum';

interface Props {
  address: string;
  priceInUSD: number | null;
}

const CurrentBalance = (props: Props) => {
  const { address, priceInUSD } = props;
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
          {balance ? `${balance.substr(0, 5)} Ether` : '--'}
          {priceInUSD &&
            balance &&
            ` ($${(parseInt(balance) * priceInUSD).toFixed(2)})`}
        </span>
      )}
    </>
  );
};

export default CurrentBalance;
