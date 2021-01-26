import React, { MouseEvent } from 'react';
import styled from 'styled-components';
import { ControlComponentProps, ControlOptionsButton } from '../../types';

const Button = styled.button`
  display: block;

  font-family: inherit;
  font-size: 14px;

  display: block;
  position: relative;

  width: 100%;
  height: 32px;

  color: currentColor;

  border: 0;
  background-color: #232323;
  /* border-radius: 4px; */
  padding: 0 4px;
`;

export function ButtonControl({
  name,
  options,
}: ControlComponentProps<ControlOptionsButton>) {
  return (
    <div style={{ paddingTop: 8, paddingBottom: 8 }}>
      <Button
        onClick={(e: MouseEvent<HTMLButtonElement>) => {
          if (options.onClick) {
            options.onClick(e);
          }
        }}
      >
        {name}
      </Button>
    </div>
  );
}
