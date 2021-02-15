import React, { useEffect, useMemo, useState } from "react";
import { GenerateHdAddressVars, HDAddress } from "./api/generateHdAddress";
import { Mnemonic } from "./api/generateMnemonic";
import {
    Box,
    Button,
    Grid,
    makeStyles,
    Paper,
    Radio,
    TextField,
    Typography,
} from "@material-ui/core";
import { ResultAddress } from "../components/ResultAddress";
import { ErrorMessage } from "../components/ErrorMessage";
import { Seed } from "./api/generateSeed";
import { PaperWrapper } from "../components/PaperWrapper";

export default function Index() {
    const [phrase, setPhrase] = useState("");
    const [path, setPath] = useState("m/1");
    const [seed, setSeed] = useState("");
    const [address, setAddress] = useState("");
    const [generated, setGenerated] = useState(false);
    const [message, setMessage] = useState("");
    const [openErrorMessage, setOpenErrorMessage] = useState(false);
    const [inputOption, setInputOption] = useState<"mnemonic" | "seed">(
        "mnemonic"
    );

    const classes = useStyles();

    const isPhraseValid = useMemo(
        () => phrase.length === 0 || phrase.trim().split(/\s+/g).length >= 12,
        [phrase]
    );

    const isPathValid = useMemo(() => /^m(\/\d+'?)*$/.test(path), [path]);

    const disabledAction =
        (inputOption === "mnemonic" && (!isPhraseValid || !phrase)) ||
        (inputOption === "seed" && !seed) ||
        !isPathValid;

    useEffect(() => {
        setGenerated(false);
    }, [path, phrase, inputOption, seed]);

    const onSubmit = async () => {
        try {
            const body: GenerateHdAddressVars = {
                path,
            };

            //Body params will change dependand on choosen input
            if (inputOption === "mnemonic") {
                body.mnemonic = phrase;
            } else {
                body.seed = seed;
            }

            const response = await fetch("/api/generateHdAddress", {
                method: "POST",
                body: JSON.stringify(body),
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

    const generateRandomMnemonic = async () => {
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

    const generateRandomSeed = async () => {
        try {
            const response = await fetch("/api/generateSeed");
            if (!response.ok) {
                throw new Error(
                    "Sorry something went wrong, please try again!"
                );
            }
            const data = (await response.json()) as Seed;
            setSeed(data.seed);
        } catch (err) {
            setMessage(err.message || err);
        }
    };

    return (
        <>
            <Box className={classes.container}>
                <PaperWrapper>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            onSubmit();
                        }}
                    >
                        <Grid container direction="column" spacing={4}>
                            <Grid item>
                                <Typography align="center" variant="h6">
                                    HD Segregated Witness Address
                                </Typography>
                            </Grid>

                            <Grid item container spacing={3}>
                                <Grid
                                    item
                                    container
                                    alignItems="center"
                                    spacing={2}
                                    wrap="nowrap"
                                >
                                    <Grid item>
                                        <Radio
                                            checked={inputOption === "mnemonic"}
                                            color="primary"
                                            onClick={() =>
                                                setInputOption("mnemonic")
                                            }
                                        />
                                    </Grid>
                                    <Grid item className={classes.input}>
                                        <TextField
                                            disabled={inputOption === "seed"}
                                            size="small"
                                            variant="outlined"
                                            fullWidth
                                            error={
                                                inputOption === "mnemonic" &&
                                                !isPhraseValid
                                            }
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
                                            disabled={inputOption === "seed"}
                                            variant="outlined"
                                            color="primary"
                                            onClick={generateRandomMnemonic}
                                        >
                                            Random
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    alignItems="center"
                                    spacing={2}
                                    wrap="nowrap"
                                >
                                    <Grid item>
                                        <Radio
                                            checked={inputOption === "seed"}
                                            color="primary"
                                            onClick={() =>
                                                setInputOption("seed")
                                            }
                                        />
                                    </Grid>
                                    <Grid item className={classes.input}>
                                        <TextField
                                            disabled={
                                                inputOption === "mnemonic"
                                            }
                                            size="small"
                                            variant="outlined"
                                            fullWidth
                                            value={seed}
                                            label="Seed"
                                            onChange={(e) =>
                                                setSeed(e.target.value)
                                            }
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            disabled={
                                                inputOption === "mnemonic"
                                            }
                                            variant="outlined"
                                            color="primary"
                                            onClick={generateRandomSeed}
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
                                        error={!isPathValid}
                                        onChange={(e) =>
                                            setPath(e.target.value)
                                        }
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
                            <Grid item>
                                <ResultAddress {...{ address }} />
                            </Grid>
                        </Grid>
                    </form>
                </PaperWrapper>
            </Box>
            <ErrorMessage
                open={openErrorMessage}
                setOpen={setOpenErrorMessage}
                {...{ message }}
            />
        </>
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
}));
