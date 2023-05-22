import {FC} from "react";
import {HideOnScroll} from "./HideOnScroll";
import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import {Link} from "react-router-dom";
import {darkText} from "../theme";

const github = "https://github.com/TarVK/WalkAndTalk";
export const InfoHeader: FC = () => {
    return (
        <>
            <HideOnScroll>
                <AppBar>
                    <Toolbar>
                        <Link to="/" css={{textDecoration: "none"}}>
                            <Typography
                                variant="h6"
                                component="div"
                                paddingRight={1}
                                css={{fontFamily: "comic sans MS", color: darkText}}>
                                Walk & Talk
                            </Typography>
                        </Link>

                        <Box sx={{flexGrow: 1}} />

                        <a
                            href={github}
                            onClick={() => {
                                if (window.top) window.top.location.href = github;
                            }}>
                            <IconButton
                                size="large"
                                aria-label="Github"
                                css={{marginRight: -10}}>
                                <GitHubIcon />
                            </IconButton>
                        </a>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>

            <Toolbar />
        </>
    );
};
