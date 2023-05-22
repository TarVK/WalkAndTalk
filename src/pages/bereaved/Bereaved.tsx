import {Box, Button, useTheme} from "@mui/material";
import {FC} from "react";
import {InfoHeader} from "../../components/InfoHeader";
import {Link} from "react-router-dom";
import {Carousel} from "../../components/Carousel";
import {texts} from "../../text";
import {Markdown} from "../../components/Markdown";

export const Bereaved: FC = () => {
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
            {texts.bereavedInfo.items.map((text, i) => (
                <Box key={i} paddingX={2}>
                    <Markdown>{text}</Markdown>
                </Box>
            ))}
            <Box padding={2}>
                <Markdown>{texts.bereavedInfo.getStarted}</Markdown>

                <Link to="/dashboard#buddy">
                    <Button
                        variant="contained"
                        css={{marginTop: theme.spacing(1), width: "100%"}}>
                        Sign up
                    </Button>
                </Link>
            </Box>
            {/* ]}
            /> */}
        </Box>
    );
};
