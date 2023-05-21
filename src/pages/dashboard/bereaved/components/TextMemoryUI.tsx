import {useDataHook} from "model-react";
import {FC} from "react";
import Box from "@mui/material/Box";
import {OverflowText} from "../../../../components/OverflowText";
import {DateUI} from "../../../../components/DateUI";
import {Typography, useTheme} from "@mui/material";
import {TextMemory} from "../../../../model/memories/TextMemory";
import {MemoryFrame} from "./MemoryFrame";
import {BaseMemory} from "../../../../model/memories/BaseMemory";

export const TextMemoryUI: FC<{
    memory: TextMemory;
    onDelete: (memory: BaseMemory) => void;
}> = ({memory, onDelete}) => <MemoryFrame memory={memory} onDelete={onDelete} />;
