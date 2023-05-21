import {Field, IDataHook} from "model-react";
import {ISectionType} from "./_types/ISectionType";
import {BaseMemory} from "./memories/BaseMemory";
import {ISerializedSection} from "./_types/serialization/ISerializedSection";
import {ISerializedMemory} from "./_types/serialization/ISerializedMemory";
import {deserializeMemory} from "./memories/deserializeMemory";

/**
 * Journal sections by category
 */
export class Section {
    protected type = new Field<ISectionType>("past");
    protected creationDate = new Field(0);
    protected memories = new Field<BaseMemory[]>([]);
    protected ID: string;
    protected name = new Field<string>("");

    /**
     * Creates a new section
     * @param ID The ID of the section
     * @param name The name of the section
     * @param type The type of the section
     * @param creationDate The creation date of the section
     * @param memories The memories of the section
     */
    public constructor(
        ID: string,
        name: string,
        type: ISectionType,
        creationDate: number,
        memories: BaseMemory[]
    ) {
        this.ID = ID;
        this.name.set(name);
        this.type.set(type);
        this.creationDate.set(creationDate);
        this.memories.set(memories);
    }

    /**
     * Retrieves the ID of the section
     * @returns The ID of the section
     */
    public getID(): string {
        return this.ID;
    }

    /**
     * Retrieves whether this section describes an event in the past about the deceased, or a newly made memory
     * @param hook The hook to subscribe to changes
     * @returns The section type
     */
    public getType(hook?: IDataHook): ISectionType {
        return this.type.get(hook);
    }

    /**
     * Retrieves the date that this section was created at, as milliseconds since Unix epoch
     * @param hook The hook to subscribe to changes
     * @returns The number of milliseconds
     */
    public getCreationDate(hook?: IDataHook): number {
        return this.creationDate.get(hook);
    }

    /**
     * Retrieves the name of the section
     * @param hook The hook to subscribe to changes
     * @returns The name
     */
    public getName(hook?: IDataHook): string {
        return this.name.get(hook);
    }

    /**
     * Sets the name of the section
     * @param name The name of the section
     */
    public setName(name: string): void {
        this.name.set(name);
    }

    /**
     * Sets the type of the section
     * @param type Whether this is a section for old or new memories
     */
    public setType(type: ISectionType): void {
        this.type.set(type);
    }

    /**
     * Retrieves all the memories that belong to this section
     * @param hook The hook to subscribe to changes
     * @returns the memories in this section
     */
    public getMemories(hook?: IDataHook): BaseMemory[] {
        return this.memories.get(hook);
    }

    /**
     * Adds a new memory to this section
     * @param memory The memory to add
     */
    public addMemory(memory: BaseMemory): void {
        const old = this.memories.get();
        if (old.includes(memory)) return;

        this.memories.set([memory, ...old]);
    }

    /**
     * Removes a memory from this section
     * @param memory The memory to remove
     */
    public removeMemory(memory: BaseMemory): void {
        const old = this.memories.get();
        if (!old.includes(memory)) return;

        this.memories.set(old.filter(f => f != memory));
    }

    /**
     * Moves a memory in this section to after the given memory (if toAfter is left out, it's moved to the front)
     * @param memory The memory to be moved
     * @param toAfter The memory to place it after
     */
    public moveMemory(memory: BaseMemory, toAfter?: BaseMemory): void {
        const old = this.memories.get();
        if (old.includes(memory)) return;

        const beforeIndex = toAfter ? old.indexOf(toAfter) : -1;
        const index = beforeIndex + 1;
        const newMemories = [...old];
        newMemories.splice(index, 0, memory);
        this.memories.set(newMemories);
    }

    /**
     * Serializes this section
     * @returns The serialized section
     */
    public serialize(): ISerializedSection {
        return {
            ID: this.ID,
            name: this.name.get(),
            creationDate: this.creationDate.get(),
            type: this.type.get(),
            memories: this.memories
                .get()
                .map(memory => memory.serialize()) as ISerializedMemory[],
        };
    }

    /**
     * Deserializes the given section
     * @param sectionData The section data
     * @returns The deserialized section
     */
    public static deserialize(sectionData: ISerializedSection): Section {
        return new Section(
            sectionData.ID,
            sectionData.name,
            sectionData.type,
            sectionData.creationDate,
            sectionData.memories.map(deserializeMemory)
        );
    }
}
