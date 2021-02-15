import { makeStyles, Snackbar } from "@material-ui/core";
import React, { SetStateAction, useEffect, useRef } from "react";

interface Props {
    open: boolean;
    setOpen: React.Dispatch<SetStateAction<boolean>>;
    message: string;
}

export const ErrorMessage = ({ open, setOpen, message }: Props) => {
    const classes = useStyles();
    const timeoutRef = useRef(0);

    useEffect(() => {
        if (open) {
            timeoutRef.current = window.setTimeout(() => {
                setOpen(false);
            }, 5000);
        }
        return () => window.clearTimeout(timeoutRef.current);
    }, [open]);

    return (
        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={open}
            className={classes.snackBar}
            ContentProps={{
                classes: {
                    root: classes.snackBar
                }
            }}
            onClose={() => setOpen(false)}
            message={message}
        />
    );
};

const useStyles = makeStyles(() => ({
    snackBar: {
        backgroundColor: "red",
    },
}));
