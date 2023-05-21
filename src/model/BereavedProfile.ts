import {Field, IDataHook} from "model-react";
import {Section} from "./Section";
import {ISerializedBereavedProfile} from "./_types/serialization/ISerializedBereavedProfile";

/**
 * The profile data for the beareaved
 */
export class BereavedProfile {
    protected forDeceased = new Field<string>("");

    protected sections = new Field<Section[]>([]);
    protected ID: string;

    /**
     * Retrieves the name of the deceased
     * @param ID The ID of the profile
     * @param deceased The name of the deceased
     * @param sections The sections for the profile
     */
    protected constructor(ID: string, deceased: string, sections: Section[]) {
        this.ID = ID;
        this.forDeceased.set(deceased);
        this.sections.set(sections);
    }

    /**
     * Retrieves the ID of the profile
     * @returns The ID of the profile
     */
    public getID(): string {
        return this.ID;
    }

    /**
     * Sets the name of the deceased
     * @param name The new name of the deceased
     */
    public setDeceasedName(name: string) {
        this.forDeceased.set(name);
    }

    /**
     * Gets the name of the deceased
     * @param hook The hook to subscribe to changes
     * @returns The current name of the deceased
     */
    public getDeceasedName(hook?: IDataHook): string {
        return this.forDeceased.get(hook);
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
     * Adds a new section to the profile
     * @param section The section to be added
     */
    public addSection(section: Section): void {
        const old = this.sections.get();
        if (old.includes(section)) return;

        this.sections.set([section, ...old]);
    }

    /**
     * Removes a section from the profile
     * @param section The section to be removed
     */
    public removeSection(section: Section): void {
        const old = this.sections.get();
        if (!old.includes(section)) return;

        this.sections.set(old.filter(s => s != section));
    }

    /**
     * Serializes this profile
     * @returns The serialized profile
     */
    public serialize(): ISerializedBereavedProfile {
        return {
            ID: this.ID,
            type: "bereaved",
            deceased: this.forDeceased.get(),
            sections: this.sections.get().map(section => section.serialize()),
        };
    }

    /**
     * Deserializes the given profile
     * @param profile The profile to deserialize
     * @returns The deserialized section
     */
    public static deserialize(profile: ISerializedBereavedProfile): BereavedProfile {
        return new BereavedProfile(
            profile.ID,
            profile.deceased,
            profile.sections.map(Section.deserialize)
        );
    }
}
