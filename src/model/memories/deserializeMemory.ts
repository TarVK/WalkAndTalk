import {ISerializedMemory} from "../_types/serialization/ISerializedMemory";
import {PictureMemory} from "./PictureMemory";
import {VideoMemory} from "./VideoMemory";
import {TextMemory} from "./TextMemory";
import {SongMemory} from "./SongMemory";
import {BaseMemory} from "./BaseMemory";

/**
 * Deserializes the given memory
 * @param memory The memory data
 * @returns The deserialized memory
 */
export function deserializeMemory(memory: ISerializedMemory): BaseMemory {
    if (memory.type == "picture") return new PictureMemory(memory);
    if (memory.type == "video") return new VideoMemory(memory);
    if (memory.type == "song") return new SongMemory(memory);
    if (memory.type == "text") return new TextMemory(memory);
    return new BaseMemory(memory);
}
