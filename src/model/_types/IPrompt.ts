import {BaseMemory} from "../memories/BaseMemory";

export type IPrompt = {
    memory?: BaseMemory;
    tip?: string;
    takePicture?: boolean;
};
