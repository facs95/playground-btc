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
