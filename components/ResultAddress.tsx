import {
    Fade,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Tooltip,
} from "@material-ui/core";
import React from "react";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface Props {
    address: string;
}
export const ResultAddress = ({ address }: Props) => {
    return (
        <Fade in={!!address}>
            <TextField
                size="small"
                variant="outlined"
                fullWidth
                InputProps={{
                    readOnly: true,
                    endAdornment: (
                        <InputAdornment position="end">
                            <CopyToClipboard text={address}>
                                <Tooltip title={"Copy to clipboard"} arrow>
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
        </Fade>
    );
};
