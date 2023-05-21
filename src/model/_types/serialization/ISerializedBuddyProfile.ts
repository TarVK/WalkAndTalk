import {IUser} from "../IUser";
import {ISerializedSection} from "./ISerializedSection";

export type ISerializedBuddyProfile = {
    ID: string;
    type: "buddy";
    forAccount: IUser;
    forDeceased: string;
    sections: ISerializedSection[];
    receivedTips: Record<string, number>;
};
