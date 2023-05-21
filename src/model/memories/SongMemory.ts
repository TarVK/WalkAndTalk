import {ISerializedMediaMemory} from "../_types/serialization/ISerializedMediaMemory";
import {MediaMemory} from "./MediaMemory";

/**
 * A song memory
 */
export class SongMemory extends MediaMemory {
    /** @override */
    public serialize(): ISerializedMediaMemory {
        return {...super.serialize(), type: "song"};
    }
}

/**
 * <iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/0VF7YLIxSQKyNiFL3X6MmN?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
 */
