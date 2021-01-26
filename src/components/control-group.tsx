import React, { useState } from 'react';
import styled from 'styled-components';
import { ControlItem } from './control-item';

const Heading = styled.h2<{ open: boolean }>`
  display: block;
  font-family: inherit;
  font-size: inherit;
  font-weight: normal;
  padding-left: 16px;
  cursor: pointer;
  position: relative;
  user-select: none;

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 8px;
    right: 16px;
    width: 12px;
    height: 2px;
    background-color: #fff;
    transition: transform 0.25s ease-out;
  }
  &:before {
    transform: rotate(${props => (props.open ? 0 : 90)}deg);
  }

  &:after {
    transform: rotate(${props => (props.open ? 0 : 180)}deg);
  }
`;

const Container = styled.div<{ open: boolean; bg: boolean }>`
  background: ${props => (props.bg ? '#fff' : '#000')};
  padding: 16px;
  display: ${props => (props.open ? 'block' : 'none')};
  margin-bottom: 8px;
`;

export const ControlGroup = ({ title, controls, options = {} }: any) => {
  const [open, setOpen] = useState(!options.defaultClosed ?? true);
  const isDefault = title !== 'DEFAULT_GROUP';
  return (
    <div>
      {isDefault && (
        <Heading open={open} onClick={() => setOpen(o => !o)}>
          {title}
        </Heading>
      )}
      <Container open={open} bg={isDefault}>
        {Array.from(controls).map((control: any) => (
          <ControlItem key={`${control.id}_${control.name}`} {...control} />
        ))}
      </Container>
    </div>
  );
};
