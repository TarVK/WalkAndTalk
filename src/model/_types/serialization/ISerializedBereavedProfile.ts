import {ISerializedSection} from "./ISerializedSection";

export type ISerializedBereavedProfile = {
    ID: string;
    type: "bereaved";
    deceased: string;
    sections: ISerializedSection[];
};
