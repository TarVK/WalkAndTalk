import {ISerializedMediaMemory} from "../_types/serialization/ISerializedMediaMemory";
import {MediaMemory} from "./MediaMemory";

/**
 * A video memory
 */
export class VideoMemory extends MediaMemory {
    /** @override */
    public serialize(): ISerializedMediaMemory {
        return {...super.serialize(), type: "video"};
    }
}
