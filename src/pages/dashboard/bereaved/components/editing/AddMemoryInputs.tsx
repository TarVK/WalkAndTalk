import {FC, useState} from "react";
import {Section} from "../../../../../model/Section";
import {Button, useTheme} from "@mui/material";
import {AddMemoryDialog} from "./AddMemoryDialog";

export const AddMemoryInputs: FC<{section: Section}> = ({section}) => {
    const [adding, setAdding] = useState<"text" | "picture" | "song" | undefined>(
        undefined
    );
    const theme = useTheme();
    return (
        <>
            <Button variant="contained" onClick={() => setAdding("picture")}>
                Add image
            </Button>
            <Button
                variant="contained"
                css={{marginTop: theme.spacing(1)}}
                onClick={() => setAdding("song")}>
                Add song
            </Button>
            <Button
                variant="contained"
                css={{marginTop: theme.spacing(1)}}
                onClick={() => setAdding("text")}>
                Add message
            </Button>
            <AddMemoryDialog
                onClose={() => setAdding(undefined)}
                section={section}
                opened={!!adding}
                type={adding!}
            />
        </>
    );
};
