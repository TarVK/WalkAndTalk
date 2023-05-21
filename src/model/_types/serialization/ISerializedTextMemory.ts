import {ISerializedBaseMemory} from "./ISerializedBaseMemory";

export type ISerializedTextMemory = ISerializedBaseMemory & {
    type: "text";
};
