import React from 'react';
import styled from 'styled-components';
import { BaseControl } from './base-control';
import { ControlComponentProps, ControlOptionsString } from '../../types';

const Input = styled.input`
  display: block;

  font-family: inherit;
  font-size: 14px;

  display: block;
  position: relative;

  width: 100%;
  height: 32px;

  margin-left: 8px;

  border: 0;
  background-color: #fff;
  color: #000;
  border-radius: 0;
  padding: 0 4px;
`;

export const StringControl = React.memo(
  ({ name, setValue, value }: ControlComponentProps<ControlOptionsString>) => {
    return (
      <BaseControl label={name} invertedLabel={true}>
        <Input value={value} onChange={e => setValue(e.target.value)} />
      </BaseControl>
    );
  }
);
