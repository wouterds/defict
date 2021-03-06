import React, { useEffect, useState } from 'react';
import { subDays, startOfYesterday } from 'date-fns';
import Ethereum from 'services/ethereum';
import Chart from './Chart';

interface Props {
  address: string;
  days: number;
  priceInUSD: number | null;
}

interface Balances {
  [ts: number]: string | null;
}

const getDates = (days: number = 30) => {
  const dates = [];
  for (let i = 0; i < days; i++) {
    dates.push(subDays(startOfYesterday(), i));
  }

  return dates;
};

const HistoricalBalance = (props: Props) => {
  const { address, days, priceInUSD } = props;
  const [balances, setBalances] = useState<Balances>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const promises = getDates(days).map(date =>
      (async () => {
        const balance = await Ethereum.walletBalanceForDate(address, date);

        return {
          ts: date.getTime(),
          balance,
        };
      })(),
    );

    Promise.all(promises).then(balances => {
      setBalances(
        balances.reduce(
          (previousValue, item) => ({
            ...previousValue,
            [item.ts]: item.balance,
          }),
          {},
        ),
      );

      setIsLoading(false);
    });
  }, [address, days]);

  return (
    <>
      <label htmlFor="balance">Historical balance{isLoading && ':'}</label>

      {isLoading && 'loading..'}
      {!isLoading && <Chart balances={balances} priceInUSD={priceInUSD} />}
    </>
  );
};

export default HistoricalBalance;
