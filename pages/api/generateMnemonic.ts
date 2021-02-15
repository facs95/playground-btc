// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as bip39 from "bip39";

export interface Mnemonic {
    mnemonic: string
}

export default async (_, res) => {
    var bip39 = require('bip39')
    const mnemonic = bip39.generateMnemonic()    

    res.status(200).json({ mnemonic } as Mnemonic);
};
