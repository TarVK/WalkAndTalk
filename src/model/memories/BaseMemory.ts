import {Field, IDataHook} from "model-react";
import {IBaseMemoryData} from "../_types/IBaseMemoryData";
import {ISerializedBaseMemory} from "../_types/serialization/ISerializedBaseMemory";

/**
 * The base memory that all memories inherit from
 */
export class BaseMemory {
    protected ID: string;
    protected date = new Field<number | undefined>(undefined);
    protected description = new Field<string | undefined>(undefined);
    protected discussedCount = new Field<number>(0);

    /**
     * Creates a new base memory
     * @param data The data of the memory
     */
    public constructor(data: IBaseMemoryData) {
        this.ID = data.ID;
        this.description.set(data.description);
        this.date.set(data.date);
        this.discussedCount.set(data.discussedCount);
    }

    /**
     * Retrieves the ID of the section
     * @returns The ID of the section
     */
    public getID(): string {
        return this.ID;
    }

    /**
     * Retrieves the description of the memory
     * @param hook The hook to subscribe to changes
     * @returns The current description
     */
    public getDescription(hook?: IDataHook): string | undefined {
        return this.description.get(hook);
    }

    /**
     * Sets the new description of the memory
     * @param description The new description
     */
    public setDescription(description?: string): void {
        this.description.set(description);
    }

    /**
     * Retrieves the date of the memory
     * @param hook The hook to subscribe to changes
     * @returns The current date
     */
    public getDate(hook?: IDataHook): number | undefined {
        return this.date.get(hook);
    }

    /**
     * Sets the date of the memory
     * @param date The new date
     */
    public setDate(date?: number): void {
        this.date.set(date);
    }

    /**
     * Serializes this memory
     * @returns The serialized memory
     */
    public serialize(): ISerializedBaseMemory {
        return {
            type: "unknown",
            ID: this.ID,
            description: this.description.get(),
            date: this.date.get(),
            discussedCount: this.discussedCount.get(),
        };
    }
}
