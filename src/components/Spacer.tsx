import styled from '@emotion/native';

interface SpacerProps {
  amount?: number;
  axis?: 'x' | 'y';
}

const Spacer = styled.View<SpacerProps>`
  flex-shrink: 0;
  height: ${p =>
    p.axis
      ? p.axis === 'y'
        ? `${p.amount}px`
        : 0
      : p.amount
      ? `${p.amount}px`
      : '8px'};

  width: ${p =>
    p.axis ? (p.axis === 'x' ? (p.amount ? `${p.amount}px` : '8px') : 0) : 0};
`;

export default Spacer;
