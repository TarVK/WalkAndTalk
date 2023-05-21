import {IMediaMemoryData} from "../_types/IMediaMemoryData";
import {ISerializedMediaMemory} from "../_types/serialization/ISerializedMediaMemory";
import {BaseMemory} from "./BaseMemory";
import {Field, IDataHook} from "model-react";

/**
 * A media memory
 */
export class MediaMemory extends BaseMemory {
    protected media = new Field<string>("");

    /**
     * Creates a new media memory
     * @param data The memory data
     */
    public constructor(data: IMediaMemoryData) {
        super(data);
        this.media.set(data.media);
    }

    /**
     * Retrieves the media of the memory
     * @param hook The hook to subscribe to changes
     * @returns The current media
     */
    public getMedia(hook?: IDataHook): string {
        return this.media.get(hook)!;
    }

    /**
     * Sets the new media of the memory
     * @param media The new media
     */
    public setMedia(media: string): void {
        this.media.set(media);
    }

    /** @override */
    public serialize(): ISerializedMediaMemory {
        return {...super.serialize(), type: "unknown", media: this.media.get()};
    }
}
