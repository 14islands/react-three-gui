import { ControlsProvider, Canvas } from './controls-provider';
export declare enum ControlsAnchor {
    TOP_LEFT = "top_left",
    TOP_RIGHT = "top_right",
    BOTTOM_LEFT = "bottom_left",
    BOTTOM_RIGHT = "bottom_right"
}
export interface ControlsProps {
    /**
     * Title to show on the controls
     */
    title?: string;
    /**
     * Collapsed by default
     */
    collapsed?: boolean;
    /**
     * Array of group names as strings
     */
    defaultClosedGroups?: string[];
    /**
     * Defaults to 300
     */
    width?: number;
    /**
     * Anchor point
     */
    anchor?: ControlsAnchor | 'top_left' | 'bottom_left' | 'top_right' | 'bottom_right';
    /**
     * Styles
     */
    style?: any;
}
interface ControlsFn {
    (props: ControlsProps): JSX.Element;
    Provider: typeof ControlsProvider;
    Canvas: typeof Canvas;
}
export declare const Controls: ControlsFn;
export {};
