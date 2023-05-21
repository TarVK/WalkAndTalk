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

export const Dashboard: FC = () => {
    const [h] = useDataHook();
    const state = useInitializer(() => {
        return new AppState();
    });
    const theme = useTheme();
    const [initialized, setInitialized] = useState(false);
    useEffect(() => {
        state.loadData().then(() => setInitialized(true));
    }, [state]);

    if (!initialized)
        return (
            <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                height={"100vh"}>
                <CircularProgress />
            </Box>
        );

    const profile = state.getSelectedProfile(h);
    return (
        <Box css={{backgroundColor: theme.palette.secondary.light}}>
            <Header state={state} />

            <Box flexGrow={1} flexShrink={1} minHeight={0}>
                {profile instanceof BuddyProfile ? (
                    <Buddy profile={profile} />
                ) : profile instanceof BereavedProfile ? (
                    <Bereaved profile={profile} />
                ) : (
                    <div>
                        {new Array(1000).fill(null).map((k, i) => (
                            <span key={i}>hoi there </span>
                        ))}
                    </div>
                )}
            </Box>
        </Box>
    );
};
