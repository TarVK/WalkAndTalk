import {Box, Button, useTheme} from "@mui/material";
import {FC} from "react";
import {InfoHeader} from "../../components/InfoHeader";
import {Link} from "react-router-dom";
import {Markdown} from "../../components/Markdown";
import {texts} from "../../text";

export const Home: FC = () => {
    const theme = useTheme();
    return (
        <Box css={{backgroundColor: theme.palette.secondary.light}} minHeight="100%">
            <InfoHeader />
            <Box padding={2}>
                <Box>
                    <Markdown>{texts.applicationSummary}</Markdown>
                </Box>
                <Box mt={2}>
                    <Markdown>{texts.signupText}</Markdown>
                    <Link to="bereaved">
                        <Button
                            variant="contained"
                            css={{marginTop: theme.spacing(1), width: "100%"}}>
                            Bereaved
                        </Button>
                    </Link>
                    <Link to="buddy">
                        <Button
                            variant="contained"
                            css={{marginTop: theme.spacing(1), width: "100%"}}>
                            Buddy
                        </Button>
                    </Link>
                </Box>
                <Box mt={2}>
                    <Markdown>{texts.loginText}</Markdown>
                    <Link to="dashboard">
                        <Button
                            variant="contained"
                            css={{marginTop: theme.spacing(1), width: "100%"}}>
                            Login
                        </Button>
                    </Link>
                </Box>
                <Box mt={6}>
                    <Markdown>{texts.applicationDescription}</Markdown>
                </Box>
            </Box>
        </Box>
    );
};
