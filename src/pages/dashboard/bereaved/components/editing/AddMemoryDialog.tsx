import {FC, useState, useEffect} from "react";
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
import dayjs from "dayjs";
import {DatePicker} from "@mui/x-date-pickers";
import CloseIcon from "@mui/icons-material/Close";
import {TextMemory} from "../../../../../model/memories/TextMemory";
import {v4 as uuid} from "uuid";
import {SongMemory} from "../../../../../model/memories/SongMemory";
import {PictureMemory} from "../../../../../model/memories/PictureMemory";
import {ImageUploader} from "./ImageUploader";
import {SongUploader} from "./SongUploader";

export const AddMemoryDialog: FC<{
    section: Section;
    type: "text" | "song" | "picture";
    opened: boolean;
    onClose: () => void;
}> = ({section, type, opened, onClose}) => {
    const [description, setDescription] = useState("");
    const [date, setDate] = useState<number | undefined>(undefined);
    const [media, setMedia] = useState("");

    useEffect(() => {
        if (opened) {
            setDescription("");
            setDate(undefined);
            setMedia("");
        }
    }, [opened]);
    const theme = useTheme();
    const addMemory = () => {
        const data = {
            ID: uuid(),
            date,
            description: description || undefined,
            discussedCount: 0,
        };
        if (type == "text") section.addMemory(new TextMemory(data));
        if (type == "song") section.addMemory(new SongMemory({...data, media}));
        if (type == "picture") section.addMemory(new PictureMemory({...data, media}));
    };
    const close = () => {
        onClose();
        addMemory();
    };

    return (
        <Dialog title={"Add memory"} opened={opened} onClose={close}>
            <Box p={2} display="flex" flexDirection="column" height="100%">
                <Box display="flex">
                    <DatePicker
                        css={{
                            flexGrow: 1,
                            "& .Mui-focused fieldset": {
                                color: `${theme.palette.primary.dark} !important`,
                                borderColor: `${theme.palette.primary.dark} !important`,
                            },
                            "& label.Mui-focused": {
                                color: `${theme.palette.primary.dark} !important`,
                            },
                        }}
                        value={date ? dayjs(date) : null}
                        label="Memory date"
                        onChange={newValue =>
                            setDate(newValue?.toDate().getTime() ?? undefined)
                        }
                    />

                    <IconButton
                        aria-label="close"
                        css={{paddingRight: 0, marginLeft: theme.spacing(1)}}
                        onClick={() => setDate(undefined)}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {type == "picture" ? (
                    <Box marginTop={2}>
                        <ImageUploader onUploaded={setMedia} media={media} />
                    </Box>
                ) : type == "song" ? (
                    <Box marginTop={2}>
                        <SongUploader onUploaded={setMedia} media={media} />
                    </Box>
                ) : undefined}

                <TextField
                    label="Description"
                    css={{width: "100%", marginTop: theme.spacing(2)}}
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                />

                <Box flex={1} />
                <Button
                    css={{width: "100%", marginTop: theme.spacing(2)}}
                    variant="contained"
                    onClick={close}
                    color="primary">
                    Add memory
                </Button>
            </Box>
        </Dialog>
    );
};
