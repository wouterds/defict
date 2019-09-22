import React, { useEffect, useState } from 'react';
import { startOfToday, subDays, format } from 'date-fns';
import Ethereum from 'services/ethereum';

interface Props {
  address: string;
  days: number;
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
  const [balances, setBalances] = useState<{ [ts: number]: string | null }>({});
  const [fetchingBalanceForDate, setFetchingBalanceForDate] = useState(false);

  useEffect(() => {
    if (fetchingBalanceForDate) {
      return;
    }

    (async () => {
      setFetchingBalanceForDate(true);

      const alreadyFetchedBalances = Object.keys(balances);
      const datesToFetch = getDates(days).filter(
        date => !alreadyFetchedBalances.includes(date.getTime().toString()),
      );

      const date = datesToFetch[0];
      const balance = await Ethereum.walletBalanceForDate(address, date);
      setBalances({
        ...balances,
        [date.getTime()]: balance,
      });

      setFetchingBalanceForDate(false);
    })();
  }, [address, days, balances, fetchingBalanceForDate]);

  return (
    <>
      <label htmlFor="balance">Historical balance</label>

      <ul>
        <li>
          {Object.entries(balances).map(([date, balance], index) => {
            return (
              <div key={`item-${index}`}>
                {`${format(new Date(parseInt(date)), 'MMMM do yyyy')}: ${
                  balance ? `${balance} Ether` : 'n/a'
                }`}
              </div>
            );
          })}
        </li>
      </ul>
    </>
  );
};

export default CurrentBalance;
