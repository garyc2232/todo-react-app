import styled from '@emotion/styled';

export const PriorityLabel = styled.div<{ number: number }>`
  background-color: ${({ number }: { number: number }) => {
    switch (true) {
      case number < 4:
        return 'grey';
      case number < 7:
        return 'yellow';
      case number > 7:
        return 'red';
      default:
        return 'grey';
    }
  }};
  height: 30px;
  width: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-weight: bold;
`;
