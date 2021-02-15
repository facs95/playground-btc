import React, { SetStateAction } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { Box, makeStyles, Typography } from "@material-ui/core";
import classes from "*.module.css";

interface Props {
    open: boolean;
    setOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default function AboutDialog({ open, setOpen }: Props) {
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>Demo for Crypto.com</DialogTitle>

            <DialogContent className={classes.container}>
                <DialogContentText>
                    <Box display="flex" justifyContent="center">
                        <Box style={{ width: 210, overflow: "hidden" }}>
                            <img
                                alt=""
                                style={{ width: 220 }}
                                src="https://media-exp1.licdn.com/dms/image/C4E03AQF0qtpPysG4Hw/profile-displayphoto-shrink_800_800/0/1553308216868?e=1619049600&v=beta&t=lLp25bb8rnMyKOCTru32NMPVJL2gQBircZW7sfJqIOs"
                            />
                        </Box>
                    </Box>
                    <Typography align="center" variant="h6">
                        Freddy Caceres
                    </Typography>
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

const useStyles = makeStyles(() => ({
    container: {
        width: 400,
    },
}));
