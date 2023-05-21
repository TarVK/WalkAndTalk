import {ISerializedMediaMemory} from "../_types/serialization/ISerializedMediaMemory";
import {MediaMemory} from "./MediaMemory";

/**
 * A picture memory
 */
export class PictureMemory extends MediaMemory {
    /** @override */
    public serialize(): ISerializedMediaMemory {
        return {...super.serialize(), type: "picture"};
    }
}
