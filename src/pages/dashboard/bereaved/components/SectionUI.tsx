import {useDataHook} from "model-react";
import {Section} from "../../../../model/Section";
import {Box, Button, Divider, Typography, IconButton, useTheme} from "@mui/material";
import {FC, useState} from "react";
import {DateUI} from "../../../../components/DateUI";
import EditIcon from "@mui/icons-material/Edit";
import {PictureMemory} from "../../../../model/memories/PictureMemory";
import {PictureMemoryUI} from "./PictureMemoryUI";
import {SongMemory} from "../../../../model/memories/SongMemory";
import {SongMemoryUI} from "./SongMemoryUI";
import {TextMemory} from "../../../../model/memories/TextMemory";
import {TextMemoryUI} from "./TextMemoryUI";
import {BaseMemory} from "../../../../model/memories/BaseMemory";
import {SectionEditor} from "./editing/SectionEditor";

export const SectionUI: FC<{section: Section; onDelete: (section: Section) => void}> = ({
    section,
    onDelete,
}) => {
    const [h] = useDataHook();
    const theme = useTheme();
    const [editing, setEditing] = useState(section.getMemories().length == 0);
    const onDeleteMemory = (memory: BaseMemory) => section.removeMemory(memory);
    return (
        <>
            <SectionEditor
                section={section}
                opened={editing}
                onClose={() => setEditing(false)}
                onDelete={onDelete}
            />
            <Box style={{position: "relative", zIndex: 0}} paddingY={2} paddingBottom={4}>
                <Box display="flex" alignItems={"center"}>
                    <Typography variant="h6" flexGrow={1}>
                        {section.getName(h)}
                    </Typography>
                    <Typography variant="subtitle2">
                        <IconButton
                            size="medium"
                            aria-label="Edit"
                            color="inherit"
                            onClick={() => setEditing(true)}>
                            <EditIcon />
                        </IconButton>
                    </Typography>
                </Box>
                <Box display="flex" alignItems={"center"} marginY={1}>
                    <Divider style={{flexGrow: 1, minWidth: 40}} variant="fullWidth" />
                    <Typography variant="subtitle2" marginLeft={1}>
                        <DateUI timestamp={section.getCreationDate(h)} />
                    </Typography>
                </Box>
                {section.getMemories(h).map(memory => {
                    if (memory instanceof PictureMemory)
                        return (
                            <PictureMemoryUI
                                key={memory.getID()}
                                memory={memory}
                                onDelete={onDeleteMemory}
                            />
                        );
                    if (memory instanceof SongMemory)
                        return (
                            <SongMemoryUI
                                key={memory.getID()}
                                memory={memory}
                                onDelete={onDeleteMemory}
                            />
                        );
                    if (memory instanceof TextMemory)
                        return (
                            <TextMemoryUI
                                key={memory.getID()}
                                memory={memory}
                                onDelete={onDeleteMemory}
                            />
                        );
                    return <div key={memory.getID()} />;
                })}

                <Box
                    borderRadius={theme.spacing(2)}
                    bgcolor={
                        section.getType(h) == "past"
                            ? theme.palette.secondary.light
                            : theme.palette.primary.light
                    }
                    position="absolute"
                    left={"-" + theme.spacing(2)}
                    top={0}
                    right={"-" + theme.spacing(2)}
                    bottom={0}
                    zIndex={-1}
                />
            </Box>
        </>
    );
};
