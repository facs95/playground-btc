// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as bip39 from "bip39";
import hdkey from "hdkey";
import * as bitcoin from "bitcoinjs-lib";

export interface HDAddress {
    publicAddress: string;
}

export default async (req, res) => {
    const { mnemonic, path } = JSON.parse(req.body);
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const root = hdkey.fromMasterSeed(seed);
    const addNode = root.derive(path);
    const hex = addNode.publicKey.toString("hex");
    const { address } = bitcoin.payments.p2wpkh({
        pubkey: Buffer.from(hex, "hex"),
    });
    res.status(200).json({ publicAddress: address } as HDAddress);
};
