import classes from "*.module.css";
import {
    Box,
    makeStyles,
    Paper,
    useMediaQuery,
    useTheme,
} from "@material-ui/core";
import React from "react";

interface Props {
    children: JSX.Element;
}
export const PaperWrapper = ({ children }: Props) => {
    const classes = useStyles();
    const theme = useTheme();
    const isSmall = useMediaQuery(() => theme.breakpoints.up("sm"));

    return (
        <Box className={classes.container}>
            <Paper
                elevation={isSmall ? 6 : 0}
                className={classes.paperContainer}
            >
                {children}
            </Paper>
        </Box>
    );
};

const useStyles = makeStyles(() => ({
    container: {
        marginTop: 100,
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
        height: "calc(100vh - 200px)",
    },
    paperContainer: {
        margin: "auto",
        minWidth: "70vw",
        minHeight: 500,
        padding: 40,
    },
}));
