import {ISerializedBaseMemory} from "./ISerializedBaseMemory";

export type ISerializedMediaMemory = ISerializedBaseMemory & {
    media: string;
    type: "picture" | "song" | "video" | "unknown";
};
