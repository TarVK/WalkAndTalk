import {FC, useState, useEffect} from "react";
import {BuddyProfile} from "../../../model/BuddyProfile";
import {Dialog} from "../../../components/Dialog";
import {Box, Button, TextField, useTheme} from "@mui/material";
import {useDataHook} from "model-react";
import {AddMemoryInputs} from "../bereaved/components/editing/AddMemoryInputs";
import {useInitializer} from "../../../hooks/useIntiializer";
import {Section} from "../../../model/Section";
import {v4 as uuid} from "uuid";
import {TextMemory} from "../../../model/memories/TextMemory";
import {PictureMemory} from "../../../model/memories/PictureMemory";

export const FinishWalkDialog: FC<{
    profile: BuddyProfile;
    opened: boolean;
    onClose: (canceled: boolean) => void;
    onSave: () => void;
}> = ({profile, opened, onClose, onSave}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const section = useInitializer(() => new Section(uuid(), "", "past", Date.now(), []));

    const save = () => {
        section.setName(title);
        const picture = profile.getPromptPicture();
        if (description)
            section.addMemory(
                new TextMemory({
                    ID: uuid(),
                    description,
                    discussedCount: 0,
                })
            );
        if (picture)
            section.addMemory(
                new PictureMemory({
                    ID: uuid(),
                    media: picture,
                    discussedCount: 0,
                })
            );
        profile.saveSection(section);
        onSave();
    };

    useEffect(() => {
        if (opened) {
            setTitle("");
            setDescription("");
        }
    }, [opened]);

    const theme = useTheme();
    return (
        <Dialog
            title={"Save conversation memory"}
            confirmCloseMessage="Are you sure you want to cancel saving the new memory?"
            opened={opened}
            onClose={() => onClose(true)}>
            <Box padding={2} display="flex" flexDirection="column" minHeight="100%">
                <TextField
                    label="Title"
                    css={{
                        width: "100%",
                        marginTop: theme.spacing(2),
                        marginBottom: theme.spacing(4),
                    }}
                    multiline
                    value={title}
                    onChange={event => setTitle(event.target.value ?? "")}
                />
                Please describe the day for {profile.getAccount().name}.
                <TextField
                    label="Description"
                    css={{
                        width: "100%",
                        marginTop: theme.spacing(1),
                        marginBottom: theme.spacing(4),
                    }}
                    multiline
                    value={description}
                    onChange={event => setDescription(event.target.value ?? "")}
                />
                Consider adding more media if relevant
                <Box mt={1} display="flex" flexDirection={"column"}>
                    <AddMemoryInputs section={section} />
                </Box>
                <Box flex={1} />
                <Button
                    css={{
                        width: "100%",
                        marginTop: theme.spacing(4),
                    }}
                    variant="contained"
                    onClick={() => {
                        onClose(false);
                        save();
                    }}
                    color="primary">
                    Save
                </Button>
            </Box>
        </Dialog>
    );
};
