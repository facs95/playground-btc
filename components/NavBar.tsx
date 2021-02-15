import {
    AppBar,
    Box,
    Button,
    ButtonGroup,
    makeStyles,
    Tab,
    Theme,
    Tabs,
    Toolbar,
    Typography,
    withStyles,
    Grid,
    IconButton,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import { useRouter } from "next/router";
import AboutDialog from "./AboutDialog";

const CustomTabs = withStyles({
    indicator: {
        backgroundColor: "#FFFFFF",
    },
})(Tabs);

export const NavBar = () => {
    const [btcPrice, setBtcPrice] = useState("");
    const [aboutDialogOpen, setAboutDialogOpen] = useState(false);

    const classes = useStyles();
    const { pathname, push } = useRouter();

    useEffect(() => {
        fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
            .then((res) => {
                res.json().then((data) => {
                    setBtcPrice(data?.bpi?.USD?.rate ?? "");
                });
            })
            .catch(() => {});
    }, []);

    const tabIndex = pathname === "/" ? 0 : 1;

    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <Grid
                        container
                        justify="space-between"
                        alignItems="center"
                        wrap="nowrap"
                    >
                        <Grid item className={classes.logoContainer}>
                            <IconButton
                                size="small"
                                onClick={() => setAboutDialogOpen(true)}
                            >
                                <img src="/logo.png" className={classes.logo} />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Box className={classes.separator}>
                                <Typography variant="h6" align="right">
                                    {`1 BTC = USD $${btcPrice}`}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <CustomTabs
                                className="AppComponent-tabs"
                                value={tabIndex}
                                variant="scrollable"
                                scrollButtons="auto"
                            >
                                <Tab
                                    tabIndex={0}
                                    icon={<AccountTreeIcon />}
                                    label="HD Address"
                                    onClick={() => push("/")}
                                />
                                <Tab
                                    tabIndex={1}
                                    onClick={() => push("/multiSig")}
                                    icon={<SupervisorAccountIcon />}
                                    label="Multi Sig"
                                />
                            </CustomTabs>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <AboutDialog open={aboutDialogOpen} setOpen={setAboutDialogOpen} />
        </>
    );
};

const useStyles = makeStyles<Theme>(() => ({
    separator: {
        flexGrow: 1,
    },
    title: {
        marginRight: 20,
    },
    logoContainer: {
        width: 280,
    },
    logo: {
        width: 50,
    },
}));
