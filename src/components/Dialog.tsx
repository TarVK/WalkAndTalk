import {FC, useState, ReactNode, forwardRef} from "react";
import {Modal, IconButton, CardActionArea, useTheme, Box} from "@mui/material";
import DefaultDialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {styled} from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import {TransitionProps} from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import {textColor} from "../theme";
import {bgColor} from "../pages/dashboard/bereaved/components/MemoryFrame";
import {ConfirmationPrompt} from "./ConfirmationPrompt";

export const Dialog: FC<{
    title: string;
    buttons?: ReactNode;
    opened: boolean;
    confirmCloseMessage?: string;
    onClose: () => void;
}> = ({title, buttons, children, opened, onClose, confirmCloseMessage}) => {
    return (
        <BootstrapDialog
            TransitionComponent={Transition}
            keepMounted
            open={opened}
            onClose={onClose}
            fullScreen>
            <BootstrapDialogTitle
                id="customized-dialog-title"
                onClose={onClose}
                confirmCloseMessage={confirmCloseMessage}
                buttons={buttons}>
                {title}
            </BootstrapDialogTitle>
            <Box css={{minHeight: 0, flexShrink: 1, flexGrow: 1, overflow: "auto"}}>
                {children}
            </Box>
        </BootstrapDialog>
    );
};

const BootstrapDialog = styled(DefaultDialog)(({theme}) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
    "& .MuiPaper-root": {
        color: textColor,
        backgroundColor: bgColor,
    },
    "& .MuiDialog-container": {
        backgroundColor: theme.palette.secondary.light,
    },
}));

const BootstrapDialogTitle: FC<{
    id: string;
    children: ReactNode;
    buttons?: ReactNode;
    confirmCloseMessage?: string;
    onClose: () => void;
}> = ({children, onClose, buttons, confirmCloseMessage, ...other}) => {
    const theme = useTheme();
    const [confirmingClose, setConfirmingClose] = useState(false);
    return (
        <DialogTitle
            sx={{m: 0, p: 1.5}}
            {...other}
            css={{
                backgroundColor: theme.palette.secondary.light,
                borderBottomLeftRadius: theme.spacing(2),
                borderBottomRightRadius: theme.spacing(2),
                display: "flex",
                alignItems: "center",
            }}>
            {children}
            <Box flexGrow={1} />
            {buttons}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={() =>
                        confirmCloseMessage ? setConfirmingClose(true) : onClose()
                    }>
                    <CloseIcon />
                </IconButton>
            ) : null}
            <ConfirmationPrompt
                opened={confirmingClose}
                onClose={() => setConfirmingClose(false)}
                onConfirm={onClose}>
                {confirmCloseMessage}
            </ConfirmationPrompt>
        </DialogTitle>
    );
};

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
