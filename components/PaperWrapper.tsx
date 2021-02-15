import classes from "*.module.css";
import { makeStyles, Paper, useMediaQuery, useTheme } from "@material-ui/core";
import React from "react";

interface Props {
    children: JSX.Element;
}
export const PaperWrapper = ({ children }: Props) => {
    const classes = useStyles();
    const theme = useTheme();
    const isSmall = useMediaQuery(() => theme.breakpoints.up("sm"));

    return (
        <Paper elevation={isSmall ? 6 : 0} className={classes.container}>
            {children}
        </Paper>
    );
};

const useStyles = makeStyles(() => ({
    container: {
        margin: "auto",
        minWidth: "70vw",
        minHeight: 500,
        padding: 40,
    },
}));
