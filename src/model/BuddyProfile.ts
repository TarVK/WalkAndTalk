import {Field, IDataHook} from "model-react";
import {Section} from "./Section";
import {IUser} from "./_types/IUser";
import {ISerializedBuddyProfile} from "./_types/serialization/ISerializedBuddyProfile";
import {IPrompt} from "./_types/IPrompt";
import {BaseMemory} from "./memories/BaseMemory";
import {shuffleArray} from "../util/shuffle";
import {tips} from "../tips";
import {PictureMemory} from "./memories/PictureMemory";
import {SongMemory} from "./memories/SongMemory";

/**
 * A profile model for when serving as a buddy
 */
export class BuddyProfile {
    protected sections = new Field<Section[]>([]);
    protected receivedTips = new Field<Record<string, number>>({});

    protected forAccount: IUser;
    protected forDeceased: string;
    protected ID: string;

    protected promptSectionData: IPromptSectionData | undefined;
    protected promptPicture = new Field<string | undefined>(undefined);
    protected prompt = new Field<IPrompt | undefined>(undefined);

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
     * Resets all the data related to the current prompt session
     */
    public resetPromptData(): void {
        this.promptPicture.set(undefined);
        this.promptSectionData = undefined;
        this.prompt.set(undefined);
    }

    /**
     * Sets the picture that was taken when the user was prompted
     * @param text The text to be added
     */
    public setPromptPicture(text: string): void {
        this.promptPicture.set(text);
    }

    /**
     * Retrieves the picture that was taken when the user was prompted
     * @param hook The hook to subscribe to changes
     * @returns The picture
     */
    public getPromptPicture(hook?: IDataHook): string | undefined {
        return this.promptPicture.get(hook);
    }

    /**
     * Selects the next prompt to be shown
     */
    public selectNextPrompt(): IPrompt {
        const currentIsMemory = !!this.getSelectedPrompt()?.memory;
        const giveStandaloneTip = currentIsMemory && Math.random() < 0.2; // 20% of time
        if (giveStandaloneTip) {
            const prompt: IPrompt = {tip: this.getTip("standalone")};
            this.prompt.set(prompt);
            return prompt;
        }

        const hasPicture = !!this.promptPicture.get();
        const takePicture = currentIsMemory && !hasPicture && Math.random() < 0.2; // 20% of time
        if (takePicture) {
            const prompt: IPrompt = {tip: this.getTip("makeMemory"), takePicture: true};
            this.prompt.set(prompt);
            return prompt;
        }

        const promptSectionData = this.getPromptSectionData();
        const memories = promptSectionData.section.getMemories();
        shuffleArray(memories);
        const notCoveredMemory = memories.find(
            memory => !promptSectionData?.covered.has(memory)
        )!;

        promptSectionData.covered.add(notCoveredMemory);
        notCoveredMemory.changeDiscussedCount(1);
        const prompt: IPrompt = {
            memory: notCoveredMemory,
        };

        const addTip = Math.random() < 0.5; // 50% of time
        if (addTip)
            prompt.tip = this.getTip(
                notCoveredMemory instanceof PictureMemory
                    ? "picture"
                    : notCoveredMemory instanceof SongMemory
                    ? "song"
                    : "text"
            );

        this.prompt.set(prompt);
        return prompt;
    }

    /**
     * Retrieves the tip to go with a certain media type,
     * modifies state to prevent tip repetition
     * @param type The type of media that the tip should accompany
     * @returns The tip with the names substituted
     */
    protected getTip(
        type: "makeMemory" | "standalone" | "picture" | "text" | "song"
    ): string {
        const availableTips = tips[type];
        const receivedTips = this.receivedTips.get();
        const counts = Object.entries(availableTips).map(([key]) => ({
            key,
            count: receivedTips[key] ?? 0,
        }));
        shuffleArray(counts); // In order to randomly choose between the least chosen ones
        counts.sort((a, b) => a.count - b.count);
        const selectedKey = counts[0].key;

        this.receivedTips.set({
            ...receivedTips,
            [selectedKey]: (receivedTips[selectedKey] ?? 0) + 1,
        });
        const tip = (availableTips as Record<string, string>)[selectedKey]
            .replace(/\[BEREAVED\]/, this.forAccount.name)
            .replace(/\[DECEASED\]/, this.forDeceased);
        return tip;
    }

    /**
     * Retrieves the current section to talk about, which is chosen based on the ongoing conversation and the least discussed section
     * @returns The data to get prompts from
     */
    protected getPromptSectionData(): IPromptSectionData {
        if (this.promptSectionData != null) {
            const notCoveredMemory = this.promptSectionData.section
                .getMemories()
                .find(memory => !this.promptSectionData?.covered.has(memory));
            if (notCoveredMemory) return this.promptSectionData;
        }

        const sections = this.sections.get();
        const sectionsWithMinDiscussed = sections
            .filter(section => section.getType() == "past")
            .map(section => ({
                section,
                minDiscussed: section
                    .getMemories()
                    .reduce(
                        (acc, memory) => Math.min(acc, memory.getDiscussedCount()),
                        Infinity
                    ),
            }));
        shuffleArray(sectionsWithMinDiscussed); // Random order for the same min discussed count
        sectionsWithMinDiscussed.sort((a, b) => a.minDiscussed - b.minDiscussed);
        this.promptSectionData = {
            section: sectionsWithMinDiscussed[0].section,
            covered: new Set(),
        };

        return this.promptSectionData;
    }

    /**
     * Retrieves the prompt that's currently selected
     * @param hook The hook to subscribe to changes
     * @returns The currently selected prompt
     */
    public getSelectedPrompt(hook?: IDataHook): IPrompt | undefined {
        return this.prompt.get(hook);
    }

    /**
     * Saves the given section to the user's sections
     * @param section The section to be saved
     */
    public saveSection(section: Section): void {
        const currentSections = this.sections.get();
        this.sections.set([section, ...currentSections]);
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

type IPromptSectionData = {section: Section; covered: Set<BaseMemory>};
