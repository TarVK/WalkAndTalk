import {FC, useState} from "react";
import {BuddyProfile} from "../../../model/BuddyProfile";
import {Box, Button, Divider, Typography} from "@mui/material";
import {Markdown} from "../../../components/Markdown";
import {texts} from "../../../text";
import {WalkView} from "./WalkView";
import {Accordion} from "../../../components/Accordion";

export const Buddy: FC<{profile: BuddyProfile}> = ({profile}) => {
    const [walking, setWalking] = useState(false);

    return (
        <>
            <Box
                margin={6}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}>
                <Button variant="contained" onClick={() => setWalking(true)}>
                    Start conversation
                </Button>
                <WalkView
                    profile={profile}
                    opened={walking}
                    onClose={() => setWalking(false)}
                />
            </Box>
            <Divider variant="middle" />
            <Box padding={2}>
                <Markdown>{texts.buddyReadingMaterial.before}</Markdown>
                <Accordion
                    items={texts.buddyReadingMaterial.items.map(({title, text}) => ({
                        title: <Typography variant="h6">{title}</Typography>,
                        text: <Markdown>{text}</Markdown>,
                    }))}
                />
                <Markdown>{texts.buddyReadingMaterial.after}</Markdown>
            </Box>
        </>
    );
};
