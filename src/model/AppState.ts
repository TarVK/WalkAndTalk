import {Field, IDataHook} from "model-react";
import {BuddyProfile} from "./BuddyProfile";
import {BereavedProfile} from "./BereavedProfile";
import {IProfile} from "./_types/IProfile";
import {ISerializedApp} from "./_types/serialization/ISerializedApp";
import {fakeData} from "../fakeData";

export class AppState {
    protected email: string;
    protected name = new Field<string>("");
    protected profiles = new Field<IProfile[]>([]);
    protected selectedProfile = new Field<IProfile | undefined>(undefined);

    /**
     * Retrieves all of the current profiles
     * @param hook The hook to subscribe to changes
     * @returns The current profiles
     */
    public getProfiles(hook?: IDataHook): IProfile[] {
        return this.profiles.get(hook);
    }

    /**
     * Adds a new profile
     * @param profile The profile to be added
     */
    public addProfile(profile: IProfile): void {
        const old = this.profiles.get();
        if (old.includes(profile)) return;

        this.profiles.set([profile, ...old]);
    }

    /**
     * Removes a profile
     * @param profile The profile to be removed
     */
    public removeProfile(profile: IProfile): void {
        const old = this.profiles.get();
        if (!old.includes(profile)) return;

        this.profiles.set(old.filter(s => s != profile));
    }

    /**
     * Selects the given profile
     * @param profile The profile to be selected and shown
     */
    public selectProfile(profile: IProfile | undefined): void {
        this.selectedProfile.set(profile);

        if (!profile) return;

        // Move selected profile to start of the list
        const old = this.profiles.get();
        if (!old.includes(profile)) return;
        this.profiles.set([profile, ...old.filter(s => s != profile)]);
    }

    /**
     * Retrieves the currently selected profile
     * @param hook The hook to subscribe to changes
     * @returns The profile that's currently selected
     */
    public getSelectedProfile(hook?: IDataHook): IProfile | undefined {
        return this.selectedProfile.get(hook);
    }

    /**
     * Loads all the app data
     */
    public async loadData(): Promise<void> {
        this.deserialize(fakeData);
        const profiles = this.profiles.get();
        if (profiles.length > 0) this.selectProfile(profiles[0]);
    }

    /**
     * Serializes the application state
     * @returns The serialized state
     */
    public serialize(): ISerializedApp {
        return {
            profiles: this.profiles.get().map(profile => profile.serialize()),
            email: this.email,
            name: this.name.get(),
        };
    }

    /**
     * Deserializes the application state
     * @param state The application state
     */
    public deserialize(state: ISerializedApp): void {
        this.profiles.set(
            state.profiles.map(profile => {
                if (profile.type == "buddy") return BuddyProfile.deserialize(profile);
                return BereavedProfile.deserialize(profile);
            })
        );
        this.email = state.email;
        this.name.set(state.name);
    }
}
