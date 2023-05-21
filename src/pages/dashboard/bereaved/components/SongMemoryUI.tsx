import {useDataHook} from "model-react";
import {FC} from "react";
import {Typography, useTheme} from "@mui/material";
import {SongMemory} from "../../../../model/memories/SongMemory";
import {MemoryFrame} from "./MemoryFrame";
import {BaseMemory} from "../../../../model/memories/BaseMemory";

export const SongMemoryUI: FC<{
    memory: SongMemory;
    onDelete: (memory: BaseMemory) => void;
}> = ({memory, onDelete}) => {
    const [h] = useDataHook();
    const theme = useTheme();
    return (
        <MemoryFrame
            memory={memory}
            onDelete={onDelete}
            fullScreen={
                <iframe
                    style={{borderRadius: theme.spacing(1)}}
                    src={`https://open.spotify.com/embed/track/${memory.getMedia(
                        h
                    )}?utm_source=generator`}
                    width="100%"
                    height="156"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"></iframe>
            }>
            <iframe
                style={{borderRadius: theme.spacing(1)}}
                src={`https://open.spotify.com/embed/track/${memory.getMedia(
                    h
                )}?utm_source=generator`}
                width={memory.getDescription(h) ? "100%" : "85%"}
                height="80"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"></iframe>
        </MemoryFrame>
    );
};
