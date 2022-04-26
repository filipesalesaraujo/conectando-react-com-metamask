import styled from "styled-components";

import { rem } from "src/utils/px-to-rem";

export const MetamaskWrap = styled.div`
  display: flex;
  margin-bottom: ${rem(30)};
`;

export const MetamaskText = styled.span`
  color: inherit;
  fontsize: ${rem(18)};
  margin-left: ${rem(5)};
`;

export const MetamaskButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  width: 100%;
  border: none;
  background-color: #48e280;
  font-weight: 700;
  color: #065e26;
  text-transform: uppercase;
  cursor: pointer;
  margin-bottom: 2rem;
  &:hover {
    background-color: #31f679;
  }
  &:active {
    background-color: #4dd27d;
  }
`;
