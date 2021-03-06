import React from "react";

// Components
import styled from "styled-components";
import { Flex } from "rimble-ui";
import icnSort from "../../assets/icn-sort.svg";

export const SortContainer = styled(Flex).attrs(() => ({
  px: 4,
  pb: 1
}))``;

export const SortParam = styled(Flex).attrs(() => ({
  fontSize: 1
}))`
  color: ${({ theme }) => theme.colors.voltBrandMain};
  flex-direction: ${({ reverse }) => (reverse ? "row-reverse" : "row")};
  align-items: center;
  cursor: pointer;
  user-select: none;
  &:before {
    content: "";
    display: block;
    background-image: url(${icnSort});
    background-repeat: no-repeat;
    width: 8px;
    height: 14px;
    fill: ${({ theme }) => theme.colors.voltBrandMain};
    margin-left: 4px;
    ${({ reverse }) =>
      !reverse &&
      `
          margin-left: 0px;
          margin-right: 4px;
        `}};
  }
`;

const SortContols = props => {
  const { sort } = props;
  return (
    <SortContainer>
      <SortParam width="60px" mr={3} onClick={sort("votes")}>
        Votes
      </SortParam>
      <SortParam flex={1} onClick={sort("id")}>
        PA
      </SortParam>
      <SortParam reverse={true} onClick={sort("favorite")}>
        Favoriten
      </SortParam>
    </SortContainer>
  );
};

export default SortContols;
