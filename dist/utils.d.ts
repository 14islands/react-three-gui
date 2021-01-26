import { ControlOptions } from './types';
export declare const defaultOptions: ControlOptions;
export declare const defaultValue: (options: ControlOptions) => any;
export declare const clamp: (num: number, clamp: number, higher?: number | undefined) => number;
export declare const map: (value: number, x1: number, y1: number, x2: number, y2: number) => number;
