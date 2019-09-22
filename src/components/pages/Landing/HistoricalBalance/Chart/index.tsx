import React, { useState } from 'react';
import { format } from 'date-fns';
import { Container, Bars, Bar } from './styles';

interface Props {
  balances: {
    [ts: number]: string | null;
  };
  priceInUSD: number | null;
}

const Chart = (props: Props) => {
  const { balances, priceInUSD } = props;
  const [ts, setTs] = useState<number | null>(null);
  const values = (Object.values(balances).filter(
    value => value !== null,
  ) as string[]).map(value => parseFloat(value));
  const max = Math.max(...values);
  const min = Math.min(...values);
  const diff = max - min;

  const balancesArray = Object.entries(balances);

  return (
    <Container>
      <Bars>
        {balancesArray.reverse().map(([date, balance], index) => {
          const percentage = balance
            ? ((1 - (max - parseFloat(balance)) / diff) * 0.6 + 0.2) * 100
            : 0;

          return (
            <Bar
              key={`item-${index}`}
              percentage={percentage}
              index={index}
              totalItems={balancesArray.length}
              onClick={() => setTs(parseInt(date))}
              active={ts === parseInt(date)}
            />
          );
        })}
      </Bars>

      {ts && (
        <>
          {`${format(new Date(ts), 'MMMM do yyyy')}: ${
            balances[ts] ? `${`${balances[ts]}`.substr(0, 5)} Ether` : 'n/a'
          }`}
          {priceInUSD &&
            balances[ts] &&
            ` ($${(parseInt(`${balances[ts]}`) * priceInUSD).toFixed(2)})`}
        </>
      )}
    </Container>
  );
};

export default Chart;
