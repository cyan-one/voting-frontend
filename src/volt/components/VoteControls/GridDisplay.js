import React from "react";
import styled from "styled-components";
import { Flex, Text } from "rimble-ui";
import { pad } from "../../utils";

const GridContainer = styled(Flex).attrs(() => ({}))`
  flex-direction: column;
  justify-content: center;
`;

const Label = styled(Text).attrs(() => ({
  color: "white",
  fontSize: 2,
  mb: 1
}))`
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.6px;
`;

const ValueContainer = styled.div`
  --border-width: 3px;
  display: grid;
  grid-template-columns: repeat(3, 40px);
  border: var(--border-width) solid white;
`;

const Cell = styled(Flex).attrs(() => ({
  alignItems: "center",
  justifyContent: "center",
  p: 2,
  fontSize: 4
}))`
  border: var(--border-width) solid white;
  border-top-width: 0;
  border-bottom-width: 0;
  &:first-of-type,
  &:last-of-type {
    border-left-width: 0;
    border-right-width: 0;
  }

  @media screen and (max-height: 600px){
    padding-top: 4px;
    padding-bottom: 4px;
    font-size: 18px;
  }
`;

export const GridDisplay = ({ label, value }) => {
  const numbers = pad(value.toString()).split("");
  return (
    <GridContainer>
      <Label>{label}</Label>
      <ValueContainer>
        {numbers.map((number, index) => {
          return <Cell key={index}>{number}</Cell>;
        })}
      </ValueContainer>
    </GridContainer>
  );
};

const EquationContainer = styled(Flex).attrs(() => ({
  justifyContent: "space-between",
  alignItems: "center",
  mb: 3
}))`
  width: 100%;
  max-width: 300px;
  opacity: ${props => props.disabled ? 0.3 : 1};
`;

const EqualityContainer = styled(Flex).attrs(() => ({
  mx: 2,
  flexDirection: "column",
  mt: 4
}))`
  height: 54px;
  align-items: center;
  justify-content: center;
`;

const Bar = styled(Flex).attrs(() => ({
  width: '20px',
  height: "5px",
  bg: "white",
  mb: "4px"
}))`
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Equality = () => {
  return (
    <EqualityContainer>
      <Bar />
      <Bar />
    </EqualityContainer>
  );
};

export const Equation = ({ disabled, votes }) => {
  return (
    <EquationContainer disabled={disabled}>
      <GridDisplay label="Votes" value={votes} />
      <Equality />
      <GridDisplay label="Voice Credits" value={votes ** 2} />
    </EquationContainer>
  );
};
