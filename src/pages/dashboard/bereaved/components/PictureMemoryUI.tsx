import {useDataHook} from "model-react";
import {PictureMemory} from "../../../../model/memories/PictureMemory";
import {FC} from "react";
import Box from "@mui/material/Box";
import {Typography, useTheme} from "@mui/material";
import {MemoryFrame} from "./MemoryFrame";
import {BaseMemory} from "../../../../model/memories/BaseMemory";

export const PictureMemoryUI: FC<{
    memory: PictureMemory;
    onDelete: (memory: BaseMemory) => void;
}> = ({memory, onDelete}) => {
    const [h] = useDataHook();
    const theme = useTheme();
    return (
        <MemoryFrame
            memory={memory}
            onDelete={onDelete}
            fullScreen={
                <img
                    src={memory.getMedia(h)}
                    width={"100%"}
                    css={{
                        maxWidth: "100%",
                        width: "auto",
                        height: "auto",
                        borderRadius: theme.spacing(1),
                    }}></img>
            }>
            <Box display="flex" justifyContent={"center"}>
                <img
                    src={memory.getMedia(h)}
                    width={"100%"}
                    css={{
                        maxWidth: "100%",
                        maxHeight: "50vh",
                        width: "auto",
                        height: "auto",
                        borderRadius: theme.spacing(1),
                    }}></img>
            </Box>
        </MemoryFrame>
    );
};
