import {ISerializedBereavedProfile} from "./ISerializedBereavedProfile";
import {ISerializedBuddyProfile} from "./ISerializedBuddyProfile";

export type ISerializedApp = {
    email: string;
    name: string;
    profiles: (ISerializedBuddyProfile | ISerializedBereavedProfile)[];
};
