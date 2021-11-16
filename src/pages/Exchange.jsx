import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Api } from "../utils/api";

const StyledInput = styled.input`
  padding: 10px;
  margin: 0 10px;
  width: 90px;
`;

const ConvertWrapper = styled.div`
  margin: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.button`
  padding: 1em 1.5em;
  text-transform: uppercase;
  background-color: #fff;
  border: 1px solid #000;
`;

const ResultContainer = styled.div`
  margin: 2em;
  padding: 1em;
  background-color: yellow;
`;

const Exchange = () => {
  const [inputValue, setInputValue] = useState(1);
  //   const [values, setValues] = useState({});
  const [finalResult, setFinalResult] = useState();

  const countFinalResult = useCallback(
    (values) => {
      const value = values["USD"];
      const result = value * inputValue;
      setFinalResult(result.toFixed(3));
    },
    [inputValue]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await Api.getCurencyValue("RUB");
    const values = resp.exchange_rates;
    countFinalResult(values);
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <ConvertWrapper>
          <StyledInput
            type="number"
            min="1"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <h3>RUB to USD</h3>
        </ConvertWrapper>
        <StyledButton type="submit">Convert</StyledButton>
      </form>
      {finalResult && (
        <ResultContainer>
          <h2>{finalResult}</h2>
        </ResultContainer>
      )}
    </div>
  );
};

export default Exchange;
