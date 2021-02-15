import * as bip39 from "bip39";

export interface Seed {
    seed: string;
}

export default async (_, res) => {
    const mnemonic = bip39.generateMnemonic();
    const seed = await bip39.mnemonicToSeed(mnemonic);
    res.status(200).json({ seed: seed.toString('hex') } as Seed);
};
