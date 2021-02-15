import {
    IconButton,
    InputAdornment,
    TextField,
    Tooltip,
} from "@material-ui/core";
import React, { SetStateAction, useCallback, useEffect, useState } from "react";
import CasinoIcon from "@material-ui/icons/Casino";

interface Props {
    index: number;
    setPubKeys: React.Dispatch<SetStateAction<string[]>>;
}

export const KeyPair = ({ index, setPubKeys }: Props) => {
    const [publicKey, setPublicKey] = useState("");

    useEffect(() => {
        setPubKeys((c) => {
            let n = [...c];
            n[index] = publicKey;
            return n;
        });
    }, [publicKey, index]);

    const refreshRandomKeys = useCallback(() => {
        fetch("/api/generateKeyPair")
            .then((res) =>
                res.json().then((data) => setPublicKey(data.publicKey))
            )
            .catch(() => {});
    }, []);

    useEffect(() => {
        refreshRandomKeys();
    }, [refreshRandomKeys]);

    return (
        <TextField
            size="small"
            variant="outlined"
            fullWidth
            value={publicKey}
            onChange={(e) => setPublicKey(e.target.value)}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <Tooltip title="Generate random key" arrow>
                            <IconButton
                                onClick={refreshRandomKeys}
                                size="small"
                            >
                                <CasinoIcon />
                            </IconButton>
                        </Tooltip>
                    </InputAdornment>
                ),
            }}
        />
    );
};
