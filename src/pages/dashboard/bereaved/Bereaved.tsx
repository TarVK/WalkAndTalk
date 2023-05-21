import {FC} from "react";
import {BereavedProfile} from "../../../model/BereavedProfile";
import {Box, Fab, IconButton, useTheme} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useDataHook} from "model-react";
import {SectionUI} from "./components/SectionUI";
import AddIcon from "@mui/icons-material/Add";
import {HideOnScroll} from "../../../components/HideOnScroll";
import {Section} from "../../../model/Section";
import {v4 as uuid} from "uuid";

export const Bereaved: FC<{profile: BereavedProfile}> = ({profile}) => {
    const [h] = useDataHook();
    const theme = useTheme();
    const onDeleteSection = (section: Section) => profile.removeSection(section);
    return (
        <Box paddingX={2} paddingTop={2} paddingBottom={4} style={{overflowX: "hidden"}}>
            <Typography variant="h3" flexGrow={1} paddingY={3}>
                {profile.getDeceasedName(h)}
            </Typography>
            {profile.getSections(h).map(section => (
                <SectionUI
                    key={section.getID()}
                    section={section}
                    onDelete={onDeleteSection}
                />
            ))}

            <Box position="fixed" bottom={theme.spacing(2)} right={theme.spacing(2)}>
                <HideOnScroll direction="up">
                    <Fab
                        color="primary"
                        aria-label="add memory"
                        onClick={() =>
                            profile.addSection(
                                new Section(uuid(), "", "past", Date.now(), [])
                            )
                        }>
                        <AddIcon />
                    </Fab>
                </HideOnScroll>
            </Box>
        </Box>
    );
};
