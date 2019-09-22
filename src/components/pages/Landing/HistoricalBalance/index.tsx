import React, { useEffect, useState } from 'react';
import { startOfToday, subDays, format } from 'date-fns';
import Ethereum from 'services/ethereum';

interface Props {
  address: string;
  days: number;
}

interface Balances {
  [ts: number]: string | null;
}

const getDates = (days: number = 30) => {
  const dates = [];
  for (let i = 0; i < days; i++) {
    dates.push(subDays(startOfToday(), i));
  }

  return dates;
};

const CurrentBalance = (props: Props) => {
  const { address, days } = props;
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
      {!isLoading && (
        <ul>
          <li>
            {Object.entries(balances).map(([date, balance], index) => {
              return (
                <div key={`item-${index}`}>
                  {`${format(new Date(parseInt(date)), 'MMMM do yyyy')}: ${
                    balance ? `${balance.substr(0, 8)} Ether` : 'n/a'
                  }`}
                </div>
              );
            })}
          </li>
        </ul>
      )}
    </>
  );
};

export default CurrentBalance;
