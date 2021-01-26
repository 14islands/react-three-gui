import { RefObject, SetStateAction } from 'react';
import { ControlItem } from 'types';
interface IControlsContext {
    values: RefObject<Map<string, any>>;
    gui: RefObject<Map<string, SetStateAction<any>>>;
    state: RefObject<Map<string, SetStateAction<any>>>;
    controls: ControlItem[];
    addControl(control: ControlItem): ControlItem;
    removeControl(control: ControlItem): any;
}
export declare const ControlsContext: import("react").Context<IControlsContext>;
export {};
