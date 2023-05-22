import {FC, useEffect, useState} from "react";
import {Header} from "./components/Header";
import {Box, CircularProgress, useTheme} from "@mui/material";
import {AppState} from "../../model/AppState";
import {useInitializer} from "../../hooks/useIntiializer";
import {useDataHook} from "model-react";
import {BuddyProfile} from "../../model/BuddyProfile";
import {Buddy} from "./buddy/Buddy";
import {BereavedProfile} from "../../model/BereavedProfile";
import {Bereaved} from "./bereaved/Bereaved";
import {useLocation} from "react-router-dom";

export const Dashboard: FC = () => {
    const [h] = useDataHook();
    const location = useLocation();
    const state = useInitializer(() => {
        return new AppState();
    });
    const theme = useTheme();
    const [initialized, setInitialized] = useState(false);
    useEffect(() => {
        state.loadData().then(() => {
            // Just for navigation in testing, due to the lack of real accounts
            if (location.hash == "#buddy") {
                const profile = state
                    .getProfiles()
                    .find(profile => profile instanceof BuddyProfile);
                if (profile) state.selectProfile(profile);
            }
            if (location.hash == "#bereaved") {
                const profile = state
                    .getProfiles()
                    .find(profile => profile instanceof BereavedProfile);
                if (profile) state.selectProfile(profile);
            }
            setInitialized(true);
        });
    }, [state]);

    if (!initialized)
        return (
            <Box css={{backgroundColor: theme.palette.secondary.light}} minHeight="100%">
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    height={"100vh"}>
                    <CircularProgress />
                </Box>
            </Box>
        );

    const profile = state.getSelectedProfile(h);
    return (
        <Box
            css={{backgroundColor: theme.palette.secondary.light}}
            display="flex"
            flexDirection="column"
            minHeight="100%">
            <Header state={state} />

            <Box flexGrow={1} flexShrink={1} minHeight={0}>
                {profile instanceof BuddyProfile ? (
                    <Buddy profile={profile} />
                ) : profile instanceof BereavedProfile ? (
                    <Bereaved profile={profile} />
                ) : (
                    // TODO: not implemented since fake profiles are provided
                    <div>Please create a profile</div>
                )}
            </Box>
        </Box>
    );
};
