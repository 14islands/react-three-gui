declare type SCProps = {
    stack?: boolean;
    flexLabel?: boolean;
    invertedLabel?: boolean;
};
export declare const Label: import("styled-components").StyledComponent<"label", any, SCProps, never>;
declare type BaseControlProps = {
    label?: string;
    flexLabel?: boolean;
    value?: string;
    children?: any;
    stack?: boolean;
    htmlFor?: any;
    invertedLabel?: boolean;
};
export declare function BaseControl({ htmlFor, label, flexLabel, value, stack, children, invertedLabel }: BaseControlProps): JSX.Element;
export {};
