import React from 'react';
import { Canvas as R3FCanvas } from 'react-three-fiber';
export declare const ControlsProvider: ({ children, }: {
    children: React.ReactNode;
}) => JSX.Element;
export declare function withControls(CanvasEl: typeof R3FCanvas): ({ children, ...props }: any) => JSX.Element;
export declare const Canvas: ({ children, ...props }: any) => JSX.Element;
