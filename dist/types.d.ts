import { Dispatch, SetStateAction, MouseEvent } from 'react';
import { SpringConfig } from '@react-spring/three';
export declare const DEFAULT_GROUP = "DEFAULT_GROUP";
export declare type ControlItem = {
    id: string;
    name: string;
    value: any;
    options: ControlOptions;
};
export declare enum ControlType {
    NUMBER = "number",
    STRING = "string",
    BUTTON = "button",
    BOOLEAN = "boolean",
    SELECT = "select",
    COLOR = "color",
    XYPAD = "xypad",
    FILE = "file",
    CUSTOM = "custom"
}
export declare type ControlComponentProps<T> = ControlItem & {
    setValue(value: any): void;
    options: T;
};
export declare type ControlOptionsBase = {
    /** Unique id for control */
    id?: string;
    type: ControlType | string;
    /** Default value */
    value?: any;
    spring?: boolean | SpringConfig;
    group?: string;
    state?: [any, Dispatch<SetStateAction<any>>];
    onChange?(value: any): void;
};
export declare type ControlOptionsNumber = {
    type: ControlType.NUMBER | 'number';
    min?: number;
    max?: number;
    value?: number;
    distance?: number;
    scrub?: boolean;
};
export declare type ControlOptionsString = {
    type: ControlType.STRING | 'string';
    value?: string;
};
export declare type ControlOptionsFile = {
    type: ControlType.FILE | 'file';
    value?: string;
    /** Loader */
    loader?: {
        load(url: string): any;
    };
};
export declare type ControlOptionsButton = {
    type: ControlType.BUTTON | 'button';
    onClick?(e: MouseEvent<HTMLButtonElement>): any;
};
export declare type ControlOptionsBoolean = {
    type: ControlType.BOOLEAN | 'boolean';
    value?: boolean;
};
export declare type ControlOptionsSelect = {
    type: ControlType.SELECT | 'select';
    items: string[];
    value?: string;
};
export declare type ControlOptionsColor = {
    type: ControlType.COLOR | 'color';
    value?: string;
    inline?: boolean;
    picker?: 'chrome' | 'sketch' | 'hue' | 'alpha' | 'block' | 'github' | 'twitter' | 'circle' | 'material' | 'compact' | 'slider' | 'swatches';
    disableAlpha?: boolean;
    colors?: string[];
};
export declare type ControlOptionsXYPad = {
    type: ControlType.XYPAD | 'xypad';
    value?: {
        x: number;
        y: number;
    };
    distance?: number;
    scrub?: boolean;
};
export declare type ControlOptionsCustom = {
    type: ControlType.CUSTOM | 'custom';
    component?: any;
};
export declare type ControlOptions = ControlOptionsBase & (ControlOptionsCustom | ControlOptionsNumber | ControlOptionsBoolean | ControlOptionsString | ControlOptionsButton | ControlOptionsColor | ControlOptionsSelect | ControlOptionsFile | ControlOptionsXYPad);
