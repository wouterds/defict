import styled, { css } from 'styled-components';

export const Container = styled.div`
  text-align: center;
  font-size: 0.9em;
  font-weight: 500;
  font-style: italic;
`;

export const Bars = styled.div`
  background: #f7f7f7;
  position: relative;
  border-radius: 3px;
  height: 150px;
  margin-bottom: 10px;
`;

export const Bar = styled.div<{
  percentage: number;
  totalItems: number;
  index: number;
  active: boolean;
}>`
  position: absolute;
  top: 0;
  bottom: 0;

  &:hover {
    cursor: pointer;

    &:after {
      background: #6437fa;
    }
  }

  &:after {
    position: absolute;
    bottom: 0;
    left: 3px;
    right: 3px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    background: #111;
    content: '';
  }

  ${({ percentage, totalItems, index, active }) => css`
    width: ${100 / totalItems}%;
    left: ${(100 / totalItems) * index}%;

    &:after {
      height: ${percentage}%;
      ${active &&
        css`
          background: #6437fa;
        `}
    }
  `}
`;
