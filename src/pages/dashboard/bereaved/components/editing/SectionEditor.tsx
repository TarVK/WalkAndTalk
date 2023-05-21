import {FC, useState} from "react";
import {Section} from "../../../../../model/Section";
import {useDataHook} from "model-react";
import {Dialog} from "../../../../../components/Dialog";
import {
    Box,
    Button,
    FormControlLabel,
    IconButton,
    Switch,
    TextField,
    useTheme,
} from "@mui/material";
import {ConfirmationPrompt} from "../../../../../components/ConfirmationPrompt";
import {Markdown} from "../../../../../components/Markdown";
import {texts} from "../../../../../text";
import {AddMemoryDialog} from "./AddMemoryDialog";

export const SectionEditor: FC<{
    section: Section;
    opened: boolean;
    onClose: () => void;
    onDelete: (section: Section) => void;
}> = ({section, opened, onClose, onDelete}) => {
    const [h] = useDataHook();
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const [adding, setAdding] = useState<"text" | "picture" | "song" | undefined>(
        undefined
    );

    const theme = useTheme();
    return (
        <Dialog title={"Edit section"} opened={opened} onClose={onClose}>
            <Box
                p={2}
                display="flex"
                flexDirection="column"
                height="100%"
                bgcolor={
                    section.getType(h) == "present"
                        ? theme.palette.primary.light
                        : undefined
                }>
                <TextField
                    label="Title"
                    css={{width: "100%", marginTop: theme.spacing(2)}}
                    value={section.getName(h)}
                    onChange={event => section.setName(event.target.value)}
                />

                <Markdown>{texts.uploadTips}</Markdown>

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

                <Box flex={1} />
                <Box display="flex" gap={2} alignItems={"center"} marginTop={2}>
                    <Button
                        css={{width: "100%"}}
                        variant="contained"
                        onClick={() => setConfirmingDeletion(true)}
                        color="secondary">
                        Delete section
                    </Button>

                    <FormControlLabel
                        control={
                            <Switch
                                checked={section.getType(h) == "present"}
                                onChange={event =>
                                    section.setType(
                                        event.target.checked ? "present" : "past"
                                    )
                                }
                            />
                        }
                        label="New"
                    />
                </Box>
                <ConfirmationPrompt
                    opened={confirmingDeletion}
                    onClose={() => setConfirmingDeletion(false)}
                    onConfirm={() => {
                        onClose();
                        onDelete(section);
                    }}>
                    Are you sure you want to delete this section?
                </ConfirmationPrompt>
            </Box>
        </Dialog>
    );
};
