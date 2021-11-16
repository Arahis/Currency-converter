import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Api } from "../utils/api";
import { localeToCurency } from "../utils/localeToCurency";

const StyledSelect = styled.select`
  padding: 10px;
  margin: 0 10px;
  width: 90px;
`;

const TableWrapper = styled.div`
  padding: 2em;
  table {
    margin: 0 auto;
    text-align: left;
  }
  td {
    padding: 10px;
  }
`;

const curenciesToConvert = ["USD", "EUR", "MYR"];
const outputCurencies = ["RUB", "USD", "EUR", "MYR"];

const Dashboard = () => {
  const [baseCurency, setBaseCurency] = useState("RUB");
  const [exchangeRates, setExchangeRates] = useState([]);

  const curenciesToConvertResult = () => {
    const curencies = curenciesToConvert.map((curency, idx) => {
      return new Promise((resolve) =>
        setTimeout(
          async () => resolve(await Api.getCurencyValue(curency)),
          idx * 2000
        )
      );
    });
    return Promise.all(curencies);
  };

  useEffect(() => {
    const lang = window.navigator.language;
    const localCurency = localeToCurency[lang.slice(0, 2)];
    setBaseCurency(localCurency);
  }, [setBaseCurency]);

  useEffect(() => {
    (async () => {
      const result = await curenciesToConvertResult();
      setExchangeRates(result);
    })();
  }, []);

  return (
    <div>
      <StyledSelect onChange={(e) => setBaseCurency(e.target.value)}>
        {outputCurencies.map((curency) => (
          <option key={curency} value={curency}>
            {curency}
          </option>
        ))}
      </StyledSelect>
      <TableWrapper>
        {exchangeRates.length ? (
          <table>
            <tbody>
              {exchangeRates
                .filter(({ base }) => base !== baseCurency)
                .map(({ base, exchange_rates }) => (
                  <tr key={base}>
                    <td>1 {base}</td>
                    <td>
                      {exchange_rates[baseCurency]} {baseCurency}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p>Loading...</p>
        )}
      </TableWrapper>
    </div>
  );
};

export default Dashboard;
