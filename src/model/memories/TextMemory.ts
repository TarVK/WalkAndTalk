import {ISerializedBaseMemory} from "../_types/serialization/ISerializedBaseMemory";
import {BaseMemory} from "./BaseMemory";
import {IDataHook} from "model-react";

/**
 * A pure text memory
 */
export class TextMemory extends BaseMemory {
    /**
     * Retrieves the description of the memory
     * @param hook The hook to subscribe to changes
     * @returns The current description
     */
    public getDescription(hook?: IDataHook): string {
        return this.description.get(hook)!;
    }

    /**
     * Sets the new description of the memory
     * @param description The new description
     */
    public setDescription(description: string): void {
        this.description.set(description);
    }

    /** @override */
    public serialize(): ISerializedBaseMemory {
        return {...super.serialize(), type: "text"};
    }
}
