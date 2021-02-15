import * as bip39 from "bip39";

export interface Mnemonic {
    mnemonic: string;
}

export default async (_, res) => {
    const mnemonic = bip39.generateMnemonic();
    res.status(200).json({ mnemonic } as Mnemonic);
};
