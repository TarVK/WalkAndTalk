import {FC, useEffect, useRef, useState} from "react";
import {BuddyProfile} from "../../../model/BuddyProfile";
import {Dialog} from "../../../components/Dialog";
import {Box, Button, useTheme} from "@mui/material";
import {useDataHook} from "model-react";
import {getMemoryUI} from "../bereaved/components/SectionUI";
import Snackbar from "@mui/material/Snackbar";
import Alert, {AlertProps} from "@mui/material/Alert";
import {showNotification} from "./showNotification";
import {PictureMemory} from "../../../model/memories/PictureMemory";
import {ImageUploader} from "../bereaved/components/editing/ImageUploader";
import {FinishWalkDialog} from "./FinishWalkDialog";

// const promptRateMinutes = 10;
const promptRateMinutes = 10 / 60; // For testing
const cameraPauzeMinutes = 10;
const snoozeTimeMinutes = 5;
export const WalkView: FC<{
    profile: BuddyProfile;
    opened: boolean;
    onClose: () => void;
}> = ({profile, opened, onClose}) => {
    const theme = useTheme();
    const timeoutID = useRef<NodeJS.Timeout | undefined>();
    const [showSnoozeMessage, setShowSnoozeMessage] = useState(false);
    const [showPictureMessage, setShowPictureMessage] = useState(false);
    const [saving, setSaving] = useState(false);

    function nextPrompt() {
        profile.selectNextPrompt();
    }
    function notify() {
        const prompt = profile.getSelectedPrompt();
        if (!prompt) return;
        let text = prompt.memory?.getDescription() ?? prompt.tip;
        if (text) text = "New topic: " + text;
        else text = "New conversation topic!";
        const maxLength = 90;
        if (text.length > maxLength) text = text.substring(0, maxLength) + "...";
        showNotification(text, {
            image:
                prompt.memory instanceof PictureMemory
                    ? prompt.memory.getMedia()
                    : undefined,
        });
    }

    function snooze() {
        scheduleNotification();
        setShowSnoozeMessage(true);
    }
    function skip() {
        nextPrompt();
        scheduleNext();
    }

    // Note, in the real application timers should be handled in a service worker for things to work properly with push notifications etc. if phone is locked
    function scheduleNotification(delayMin: number = promptRateMinutes) {
        stopSchedule();
        timeoutID.current = setTimeout(() => {
            notify();
            scheduleNext();
        }, 1000 * 60 * delayMin);
    }
    function scheduleNext(delayMin: number = promptRateMinutes) {
        stopSchedule();
        timeoutID.current = setTimeout(() => {
            nextPrompt();
            notify();
            scheduleNext();
        }, 1000 * 60 * delayMin);
    }
    function stopSchedule() {
        if (timeoutID.current) clearTimeout(timeoutID.current);
    }

    useEffect(() => {
        if (opened) {
            profile.resetPromptData();
            nextPrompt();
            scheduleNext();

            return () => clearTimeout(timeoutID.current);
        }
    }, [opened]);

    const [h] = useDataHook();
    const prompt = profile.getSelectedPrompt(h);
    return (
        <Dialog
            title={"Conversate"}
            confirmCloseMessage="Are you sure you want to cancel the conversation?"
            opened={opened}
            onClose={onClose}>
            <Box padding={2} display="flex" flexDirection="column" minHeight="100%">
                {prompt && (
                    <>
                        {prompt.memory && getMemoryUI(prompt.memory, () => {}, true)}

                        {prompt.takePicture && (
                            <Box mb={2}>
                                <ImageUploader
                                    text={"Take a picture"}
                                    onUploaded={text => {
                                        profile.setPromptPicture(text);
                                        nextPrompt();
                                        scheduleNext();
                                        setShowPictureMessage(true);
                                    }}
                                    media={profile.getPromptPicture(h)}
                                    onStart={() => scheduleNext(cameraPauzeMinutes)}
                                />
                            </Box>
                        )}
                        <Snackbar
                            open={showPictureMessage}
                            autoHideDuration={5000}
                            sx={{bottom: 90}}
                            onClose={() => setShowPictureMessage(false)}>
                            <Alert
                                elevation={6}
                                variant="filled"
                                onClose={() => setShowPictureMessage(false)}
                                severity="success"
                                sx={{width: "100%"}}>
                                Picture saved!
                            </Alert>
                        </Snackbar>

                        {prompt.tip && <Box>{prompt.tip}</Box>}

                        <Box display="flex" gap={2} mt={2}>
                            <Button variant="contained" onClick={skip}>
                                Skip
                            </Button>
                            <Button variant="contained" onClick={snooze}>
                                Snooze ({snoozeTimeMinutes}min)
                            </Button>
                        </Box>

                        <Snackbar
                            open={showSnoozeMessage}
                            autoHideDuration={5000}
                            sx={{bottom: 90}}
                            onClose={() => setShowSnoozeMessage(false)}>
                            <Alert
                                elevation={6}
                                variant="filled"
                                onClose={() => setShowSnoozeMessage(false)}
                                severity="success"
                                sx={{width: "100%"}}>
                                Topic snoozed for {snoozeTimeMinutes} minutes
                            </Alert>
                        </Snackbar>
                    </>
                )}

                <Box flex={1} />
                <Button
                    css={{width: "100%", marginTop: theme.spacing(2)}}
                    variant="contained"
                    onClick={() => {
                        setSaving(true);
                        stopSchedule();
                    }}
                    color="secondary">
                    Finish conversation
                </Button>
                <FinishWalkDialog
                    profile={profile}
                    opened={saving}
                    onClose={canceled => {
                        setSaving(false);
                        if (canceled) scheduleNext();
                    }}
                    onSave={() => {
                        onClose();
                    }}
                />
            </Box>
        </Dialog>
    );
};
