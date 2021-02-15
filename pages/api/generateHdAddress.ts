import * as bip39 from "bip39";
import hdkey from "hdkey";
import * as bitcoin from "bitcoinjs-lib";

export interface HDAddress {
    publicAddress: string;
}

export interface GenerateHdAddressVars {
    mnemonic?: string
    seed?: string
    path: string
}

export default async (req, res) => {
    const { mnemonic, path, seed  } = JSON.parse(req.body) as GenerateHdAddressVars;
    let masterSeed: Buffer | null = null;
    if (mnemonic) {
        masterSeed = await bip39.mnemonicToSeed(mnemonic);
    } else {
        masterSeed = Buffer.from(seed, 'hex');
    }
    const root = hdkey.fromMasterSeed(masterSeed);
    const addNode = root.derive(path);
    const hex = addNode.publicKey.toString("hex");
    const { address } = bitcoin.payments.p2wpkh({
        pubkey: Buffer.from(hex, "hex"),
    });
    res.status(200).json({ publicAddress: address } as HDAddress);
};