import {Box, Button, useTheme} from "@mui/material";
import {FC} from "react";
import {InfoHeader} from "../../components/InfoHeader";
import {Link} from "react-router-dom";
import {Carousel} from "../../components/Carousel";
import {texts} from "../../text";
import {Markdown} from "../../components/Markdown";

export const Buddy: FC = () => {
    const theme = useTheme();
    return (
        <Box
            css={{backgroundColor: theme.palette.secondary.light}}
            display="flex"
            flexDirection="column"
            minHeight="100%">
            <InfoHeader />
            {/* <Carousel
                items={[ */}
            {[
                texts.buddyInfo.items.map((text, i) => (
                    <Box paddingX={2} key={i}>
                        <Markdown>{text}</Markdown>
                    </Box>
                )),
            ]}
            <Box padding={2}>
                <Markdown>{texts.buddyInfo.getStarted}</Markdown>

                <Link to="/dashboard#buddy">
                    <Button
                        variant="contained"
                        css={{marginTop: theme.spacing(1), width: "100%"}}>
                        Get started
                    </Button>
                </Link>
            </Box>
            {/* ]}
            /> */}
        </Box>
    );
};
