import {FC, ChangeEvent, useState} from "react";
import {theme} from "../../../../../theme";
import {
    Box,
    Button,
    FormControlLabel,
    IconButton,
    Switch,
    TextField,
    useTheme,
} from "@mui/material";

export const SongUploader: FC<{onUploaded: (song: string) => void; media?: string}> = ({
    onUploaded,
    media,
}) => {
    const [text, setText] = useState("");
    const editText = (text: string) => {
        setText(text);
        const match = text.match(/(?:.*\/)?([^?]*)(?:\?.*)?$/);
        if (match) {
            onUploaded(match[1]);
        }
    };

    return (
        <Box>
            <TextField
                label="Spotify song link (click share in spotify)"
                css={{width: "100%"}}
                value={text}
                onChange={event => editText(event.target.value)}
            />
            {media && (
                <iframe
                    style={{borderRadius: theme.spacing(1), marginTop: theme.spacing(2)}}
                    src={`https://open.spotify.com/embed/track/${media}?utm_source=generator`}
                    width={"100%"}
                    height="80"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"></iframe>
            )}
        </Box>
    );
};
