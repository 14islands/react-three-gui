import React from 'react';
import styled from 'styled-components';

type SCProps = {
  stack?: boolean;
  flexLabel?: boolean;
  invertedLabel?: boolean;
};

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 0;
`;

export const Label = styled.label<SCProps>`
  display: flex;
  font-family: inherit;
  font-size: 14px;
  width: 56px;
  user-select: none;
  ${props => (props.flexLabel === true ? 'flex: 1;' : '')}
  ${props => (props.invertedLabel === true ? 'color: #fff;' : 'color: #000')}
`;

const Content = styled.div<SCProps>`
  display: flex;
  ${props => (props.flexLabel !== true ? 'flex: 1;' : '')}
  justify-content: flex-end;
  padding: 0 8px;
`;

const Value = styled.div<SCProps>`
  display: flex;
  font-family: inherit;
  white-space: nowrap;
  font-size: 14px;
  color: #000;
  justify-content: flex-end;
  ${props => (props.stack ? 'flex: 1;' : '')}
  ${props => (props.stack ? '' : 'width: 42px;')}
`;

type BaseControlProps = {
  label?: string;
  flexLabel?: boolean;
  value?: string;
  children?: any;
  stack?: boolean;
  htmlFor?: any;
  invertedLabel?: boolean;
};

export function BaseControl({
  htmlFor,
  label,
  flexLabel,
  value,
  stack,
  children,
  invertedLabel
}: BaseControlProps) {
  if (stack) {
    return (
      <div>
        <Row>
          <Label flexLabel={flexLabel} invertedLabel={invertedLabel}>{label}</Label>
          <Value stack flexLabel={flexLabel}>
            {value}
          </Value>
        </Row>
        {children}
      </div>
    );
  }

  return (
    <Row>
      <Label flexLabel={flexLabel} invertedLabel={invertedLabel} htmlFor={htmlFor}>
        {label}
      </Label>
      <Content flexLabel={flexLabel}>{children}</Content>
      {typeof value !== 'undefined' && <Value>{value}</Value>}
    </Row>
  );
}
