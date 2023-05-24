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
            <Box paddingX={2}>
                <Markdown>{[...texts.buddyInfo.items, texts.buddyInfo.getStarted].join("\n\n")}</Markdown>
            </Box>
            <Box padding={2} paddingTop={0}>
                <Link to="/dashboard#buddy">
                    <Button
                        variant="contained"
                        css={{ width: "100%"}}>
                        Sign up
                    </Button>
                </Link>
            </Box>
            {/* ]}
            /> */}
        </Box>
    );
};
