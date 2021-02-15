import React, { useEffect, useMemo, useState } from "react";
import { HDAddress } from "./api/generateHdAddress";
import { Mnemonic } from "./api/generateMnemonic";
import {
    Box,
    Button,
    Fade,
    Grid,
    IconButton,
    InputAdornment,
    makeStyles,
    Paper,
    TextField,
    Tooltip,
    Typography,
} from "@material-ui/core";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function Index() {
    const [phrase, setPhrase] = useState("");
    const [path, setPath] = useState("m/1");
    const [address, setAddress] = useState("");
    const [generated, setGenerated] = useState(false);
    const [message, setMessage] = useState("");

    const classes = useStyles();

    const isPhraseValid = useMemo(
        () => phrase.length === 0 || phrase.trim().split(/\s+/g).length >= 12,
        [phrase]
    );

    const disabledAction =
        !isPhraseValid || !phrase || !/^m(\/\d+'?)*$/.test(path);

    useEffect(() => {
        setGenerated(false);
    }, [path, phrase]);

    const onSubmit = async () => {
        try {
            const response = await fetch("/api/generateHdAddress", {
                method: "POST",
                body: JSON.stringify({
                    mnemonic: phrase,
                    path,
                }),
            });
            if (!response.ok) {
                throw new Error(
                    "Sorry something went wrong, please try again!"
                );
            }
            const data = (await response.json()) as HDAddress;
            setGenerated(true);
            setAddress(data.publicAddress);
        } catch (err) {
            setMessage(err.message || err);
        }
    };

    const generateRandom = async () => {
        try {
            const response = await fetch("/api/generateMnemonic");
            if (!response.ok) {
                throw new Error(
                    "Sorry something went wrong, please try again!"
                );
            }
            const data = (await response.json()) as Mnemonic;
            setPhrase(data.mnemonic);
        } catch (err) {
            setMessage(err.message || err);
        }
    };

    return (
        <Box className={classes.container}>
            <Paper elevation={6} className={classes.paper}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit();
                    }}
                >
                    <Grid container direction="column" spacing={4}>
                        <Grid item>
                            <Typography align="center" variant="h6">
                                HD Segwit Address
                            </Typography>
                        </Grid>
                        <Grid item container spacing={3}>
                            <Grid
                                item
                                container
                                alignItems="center"
                                spacing={2}
                            >
                                <Grid item className={classes.input}>
                                    <TextField
                                        size="small"
                                        variant="outlined"
                                        fullWidth
                                        autoComplete="off"
                                        value={phrase}
                                        label="Mnemonic Phrase"
                                        onChange={(e) =>
                                            setPhrase(e.target.value)
                                        }
                                    />
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={generateRandom}
                                    >
                                        Random
                                    </Button>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    size="small"
                                    variant="outlined"
                                    fullWidth
                                    value={path}
                                    label="Path"
                                    onChange={(e) => setPath(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Grid item className={classes.centerItem}>
                            <Button
                                type="submit"
                                size="large"
                                variant="contained"
                                color="primary"
                                disabled={disabledAction || generated}
                            >
                                Generate
                            </Button>
                        </Grid>
                        <Grid item container alignItems="center" spacing={2}>
                            <Fade in={!!address}>
                                <Grid item className={classes.input}>
                                    <TextField
                                        size="small"
                                        variant="outlined"
                                        fullWidth
                                        InputProps={{
                                            readOnly: true,
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <CopyToClipboard
                                                        text={address}
                                                    >
                                                        <Tooltip
                                                            title={
                                                                "Copy to clipboard"
                                                            }
                                                            arrow
                                                        >
                                                            <IconButton size="small">
                                                                <FileCopyIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </CopyToClipboard>
                                                </InputAdornment>
                                            ),
                                        }}
                                        value={address}
                                    />
                                </Grid>
                            </Fade>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
}

const useStyles = makeStyles(() => ({
    container: {
        marginTop: 100,
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
        height: "calc(100vh - 200px)",
    },
    paper: {
        margin: "auto",
        minWidth: "70vw",
        minHeight: 500,
        padding: 40,
    },
    input: {
        flexGrow: 1,
    },
    centerItem: {
        alignSelf: "center",
    },
    icon: {
        alignSelf: "center",
    },
}));
