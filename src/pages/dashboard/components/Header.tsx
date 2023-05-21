import {FC, MouseEvent, useState} from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
    FormControl,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {AppState} from "../../../model/AppState";
import {useDataHook} from "model-react";
import {BuddyProfile} from "../../../model/BuddyProfile";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import {HideOnScroll} from "../../../components/HideOnScroll";

export const Header: FC<{state: AppState}> = ({state}) => {
    const [moreAnchorEl, setMoreAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuClose = () => {
        setMoreAnchorEl(null);
    };

    const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
        setMoreAnchorEl(event.currentTarget);
    };
    const menuId = "accountMenu";
    const [h] = useDataHook();

    const selectProfile = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
        state.selectProfile(
            state.getProfiles().find(profile => profile.getID() == event.target.value)
        );
    };

    return (
        <>
            <HideOnScroll>
                <AppBar>
                    <Toolbar>
                        <Typography
                            variant="h6"
                            component="div"
                            paddingRight={1}
                            css={{fontFamily: "comic sans MS", color: "rgb(10, 61, 0)"}}>
                            W&T
                        </Typography>

                        <Box sx={{flexGrow: 1}} />

                        <Box>
                            <FormControl variant="standard">
                                <Select
                                    css={{".MuiSelect-select": {display: "flex"}}}
                                    label="profile"
                                    value={state.getSelectedProfile(h)?.getID()}
                                    onChange={selectProfile}>
                                    {state.getProfiles(h).map(profile => {
                                        const ID = profile.getID();
                                        if (profile instanceof BuddyProfile)
                                            return (
                                                <MenuItem key={ID} value={ID}>
                                                    <ListItemIcon>
                                                        <AccessibilityNewIcon />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={profile.getDeceased()}
                                                    />
                                                </MenuItem>
                                            );
                                        else
                                            return (
                                                <MenuItem key={ID} value={ID}>
                                                    {profile.getDeceasedName(h)}
                                                </MenuItem>
                                            );
                                    })}
                                </Select>
                            </FormControl>
                        </Box>

                        <Menu
                            anchorEl={moreAnchorEl}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            id={menuId}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={!!moreAnchorEl}
                            onClose={handleMenuClose}>
                            <MenuItem onClick={handleMenuClose}>Connect</MenuItem>
                            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                            <MenuItem onClick={handleMenuClose}>Log out</MenuItem>
                        </Menu>
                        <Box>
                            <IconButton
                                size="large"
                                aria-label="Profile"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleMenuOpen}
                                css={{paddingRight: 0}}>
                                <AccountCircle />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
        </>
    );
};
