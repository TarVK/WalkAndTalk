import {BaseMemory} from "../../../../model/memories/BaseMemory";
import {FC, useState, ReactNode, forwardRef} from "react";
import {useDataHook} from "model-react";
import Box from "@mui/material/Box";
import {Modal, IconButton, CardActionArea, TextField, Button} from "@mui/material";
import {OverflowText} from "../../../../components/OverflowText";
import {DateUI} from "../../../../components/DateUI";
import {Paper, Typography, useTheme} from "@mui/material";
import {Dialog} from "../../../../components/Dialog";
import EditIcon from "@mui/icons-material/Edit";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import CloseIcon from "@mui/icons-material/Close";
import {ConfirmationPrompt} from "../../../../components/ConfirmationPrompt";

export const MemoryFrame: FC<{
    memory: BaseMemory;
    fullScreen?: ReactNode;
    onDelete?: (memory: BaseMemory) => void;
    viewOnly?: boolean;
}> = ({memory, children, fullScreen, onDelete = () => {}, viewOnly}) => {
    const [h] = useDataHook();
    const description = memory.getDescription(h);
    const date = memory.getDate(h);
    const theme = useTheme();
    const [opened, setOpened] = useState(false);
    const open = () => {
        setEditing(false);
        setOpened(true);
    };
    const [editing, setEditing] = useState(false);
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);

    return (
        <>
            <Box
                boxShadow={"rgba(0, 0, 0, 0.4) 0px 5px 10px -4px"}
                marginBottom={2}
                borderRadius={theme.spacing(1)}
                css={{backgroundColor: bgColor}}>
                <CardActionArea onClick={open}>
                    {date && (
                        <Box display="flex" flexDirection={"row-reverse"} padding={0.5}>
                            <Typography variant="subtitle2">
                                <DateUI timestamp={date} />
                            </Typography>
                        </Box>
                    )}
                    {children}
                    {description && (
                        <Typography p={1} variant="body2">
                            <OverflowText rows={8}>{description}</OverflowText>
                        </Typography>
                    )}
                </CardActionArea>
            </Box>
            <Dialog
                title={"View media"}
                opened={opened}
                onClose={() => setOpened(false)}
                buttons={
                    !viewOnly && (
                        <IconButton
                            size="medium"
                            aria-label="Edit"
                            onClick={() => setEditing(editing => !editing)}>
                            <EditIcon />
                        </IconButton>
                    )
                }>
                {editing ? (
                    <Box
                        padding={2}
                        display="flex"
                        flexDirection="column"
                        minHeight="100%">
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
                                    memory.setDate(
                                        newValue?.toDate().getTime() ?? undefined
                                    )
                                }
                            />

                            <IconButton
                                aria-label="close"
                                css={{paddingRight: 0, marginLeft: theme.spacing(1)}}
                                onClick={() => memory.setDate(undefined)}>
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        <TextField
                            label="Description"
                            css={{width: "100%", marginTop: theme.spacing(2)}}
                            multiline
                            value={memory.getDescription(h)}
                            onChange={event =>
                                memory.setDescription(event.target.value || undefined)
                            }
                        />

                        <Box flex={1} />
                        <Button
                            css={{width: "100%", marginTop: theme.spacing(2)}}
                            variant="contained"
                            onClick={() => setConfirmingDeletion(true)}
                            color="secondary">
                            Delete
                        </Button>
                        <ConfirmationPrompt
                            opened={confirmingDeletion}
                            onClose={() => setConfirmingDeletion(false)}
                            onConfirm={() => onDelete(memory)}>
                            Are you sure you want to delete this memory?
                        </ConfirmationPrompt>
                    </Box>
                ) : (
                    <>
                        {date && (
                            <Box
                                display="flex"
                                flexDirection={"row-reverse"}
                                padding={0.5}>
                                <Typography variant="subtitle2">
                                    <DateUI timestamp={date} />
                                </Typography>
                            </Box>
                        )}
                        {fullScreen}
                        {description && (
                            <Typography p={1} variant="body2">
                                {description}
                            </Typography>
                        )}
                    </>
                )}
            </Dialog>
        </>
    );
};
export const bgColor = "rgba(255, 255, 255, 0.8)";
