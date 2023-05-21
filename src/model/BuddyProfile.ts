import {Field, IDataHook} from "model-react";
import {Section} from "./Section";
import {IUser} from "./_types/IUser";
import {ISerializedBuddyProfile} from "./_types/serialization/ISerializedBuddyProfile";

/**
 * A profile model for when serving as a buddy
 */
export class BuddyProfile {
    protected sections = new Field<Section[]>([]);
    protected receivedTips = new Field<Record<string, number>>({});

    protected forAccount: IUser;
    protected forDeceased: string;
    protected ID: string;

    /**
     * A buddy user profile
     * @param ID The ID of the profile
     * @param forAccount The account that the user is a buddy for
     * @param forDeceased The name of the deceased
     * @param sections The sections of the deceased
     * @param receivedTips The tips that were received for this user
     */
    public constructor(
        ID: string,
        forAccount: IUser,
        forDeceased: string,
        sections: Section[],
        receivedTips: Record<string, number>
    ) {
        this.ID = ID;
        this.forAccount = forAccount;
        this.forDeceased = forDeceased;
        this.sections.set(sections);
        this.receivedTips.set(receivedTips);
    }

    /**
     * Retrieves the ID of the profile
     * @returns The ID of the profile
     */
    public getID(): string {
        return this.ID;
    }

    /**
     * Retrieves the account that you are serving as a buddy for
     * @returns The account
     */
    public getAccount(): IUser {
        return this.forAccount;
    }

    /**
     * Retrieves the deceased that you are helping the bereaved with
     * @returns The deceased's name
     */
    public getDeceased(): string {
        return this.forDeceased;
    }

    /**
     * Retrieves all the sections for the given deceased person
     * @param hook The hook to subscribe to changes
     * @returns The sections
     */
    public getSections(hook?: IDataHook): Section[] {
        return this.sections.get(hook);
    }

    /**
     * Retrieves all data about the tips the user received already
     * @param hook The hook to subscribe to changes
     * @returns The tips that were received, where the key is the tip id and the count is how often it was received
     */
    public getReceivedTips(hook?: IDataHook): Record<string, number> {
        return this.receivedTips.get(hook);
    }

    /**
     * Adjusts how often the given tip was received
     * @param tip The tip that was received
     * @param delta How much to increment or decrement(negative value) the count by
     */
    public changeReceivedTips(tip: string, delta: number): void {
        const current = this.receivedTips.get();
        const currentCount = current[tip] ?? 0;
        const newCount = currentCount + delta;
        const copy = {...current};
        copy[tip] = newCount;
        if (newCount <= 0) delete copy[tip];
        this.receivedTips.set(copy);
    }

    /**
     * Serializes this profile
     * @returns The serialized profile
     */
    public serialize(): ISerializedBuddyProfile {
        return {
            ID: this.ID,
            type: "buddy",
            forDeceased: this.forDeceased,
            forAccount: this.forAccount,
            sections: this.sections.get().map(section => section.serialize()),
            receivedTips: this.receivedTips.get(),
        };
    }

    /**
     * Deserializes the given profile
     * @param profile The profile to deserialize
     * @returns The deserialized section
     */
    public static deserialize(profile: ISerializedBuddyProfile): BuddyProfile {
        return new BuddyProfile(
            profile.ID,
            profile.forAccount,
            profile.forDeceased,
            profile.sections.map(Section.deserialize),
            profile.receivedTips
        );
    }
}
