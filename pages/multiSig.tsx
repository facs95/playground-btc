import React, { useEffect, useMemo, useState } from "react";
import {
    Box,
    Button,
    Grid,
    makeStyles,
    MenuItem,
    Paper,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from "@material-ui/core";
import { KeyPair } from "../components/KeyPair";
import { ResultAddress } from "../components/ResultAddress";
import {
    GenerateMultiSigAddressVars,
    MultiSigAddress,
} from "./api/generateMultisigAddress";
import { ErrorMessage } from "../components/ErrorMessage";
import { PaperWrapper } from "../components/PaperWrapper";

export default function Index() {
    const [address, setAddress] = useState("");
    const [generated, setGenerated] = useState(false);
    const [message, setMessage] = useState("");
    const [openErrorMessage, setOpenErrorMessage] = useState(false);
    const [numberOfKeys, setNumberOfKeys] = useState(1);
    const [numberOfSigns, setNumberOfSigns] = useState(1);
    const [pubKeys, setPubKeys] = useState<string[]>([]);

    const classes = useStyles();

    const theme = useTheme();
    const isSmall = useMediaQuery(() => theme.breakpoints.up("sm"));

    useEffect(() => {
        setGenerated(false);
    }, [numberOfKeys, numberOfSigns, pubKeys]);

    const signatureAmountOptions = useMemo(() => {
        return Array.from(Array(numberOfKeys).keys());
    }, [numberOfKeys]);

    const onSubmit = async () => {
        try {
            const body: GenerateMultiSigAddressVars = {
                pubKeys: [...pubKeys].splice(0, numberOfKeys),
                m: numberOfSigns,
            };
            const response = await fetch("/api/generateMultisigAddress", {
                method: "POST",
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                throw new Error("Could not generate, please check addresses");
            }
            const data = (await response.json()) as MultiSigAddress;
            setGenerated(true);
            setAddress(data.address);
        } catch (err) {
            setAddress("");
            setMessage(err.message || err);
            setOpenErrorMessage(true);
        }
    };

    return (
        <>
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
                                Multisignature P2SH Address
                            </Typography>
                        </Grid>
                        <Grid item container wrap="nowrap" spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    value={numberOfKeys}
                                    onChange={(e) => {
                                        let newNum = Number(e.target.value);
                                        if (newNum < numberOfSigns + 1) {
                                            setNumberOfSigns(1);
                                        }
                                        setNumberOfKeys(newNum);
                                    }}
                                    label="Number of keys"
                                    size="small"
                                    fullWidth
                                    variant="outlined"
                                    select
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                                        (item, index) => (
                                            <MenuItem
                                                key={`key-${index}`}
                                                value={item}
                                            >
                                                {item}
                                            </MenuItem>
                                        )
                                    )}
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    value={numberOfSigns}
                                    onChange={(e) =>
                                        setNumberOfSigns(Number(e.target.value))
                                    }
                                    label={
                                        isSmall
                                            ? "Requried Signatures"
                                            : "Signatures"
                                    }
                                    size="small"
                                    fullWidth
                                    variant="outlined"
                                    select
                                >
                                    {signatureAmountOptions.map(
                                        (item, index) => (
                                            <MenuItem
                                                key={`signatures-${index}`}
                                                value={item + 1}
                                            >
                                                {item + 1}
                                            </MenuItem>
                                        )
                                    )}
                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid item container direction="column" spacing={1}>
                            <Grid item>
                                <Typography variant="h6">
                                    Public Keys
                                </Typography>
                            </Grid>
                            {signatureAmountOptions.map((_, index) => (
                                <Grid key={`publicKey-${index}`} item>
                                    <KeyPair
                                        {...{ index }}
                                        {...{ setPubKeys }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <Grid item className={classes.centerItem}>
                            <Button
                                type="submit"
                                size="large"
                                variant="contained"
                                color="primary"
                                disabled={generated}
                            >
                                Generate
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <ResultAddress {...{ address }} />
                        </Grid>
                    </Grid>
                </form>
            </PaperWrapper>
            <ErrorMessage
                open={openErrorMessage}
                setOpen={setOpenErrorMessage}
                {...{ message }}
            />
        </>
    );
}

const useStyles = makeStyles(() => ({
    input: {
        flexGrow: 1,
    },
    centerItem: {
        alignSelf: "center",
    },
}));
