import {FC} from "react";
import {BuddyProfile} from "../../../model/BuddyProfile";
import {Box, Button, Divider, Typography} from "@mui/material";
import {Markdown} from "../../../components/Markdown";
import {texts} from "../../../text";

export const Buddy: FC<{profile: BuddyProfile}> = ({profile}) => {
    return (
        <>
            <Box
                margin={6}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}>
                <Button variant="contained">Start conversation</Button>
            </Box>
            <Divider variant="middle" />
            <Box padding={2}>
                <Markdown>{texts.buddyReadingMaterial}</Markdown>
            </Box>
        </>
    );
};
