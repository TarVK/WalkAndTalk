import {ISectionType} from "../ISectionType";
import {ISerializedMemory} from "./ISerializedMemory";

export type ISerializedSection = {
    ID: string;
    name: string;
    type: ISectionType;
    creationDate: number;
    memories: ISerializedMemory[];
};
