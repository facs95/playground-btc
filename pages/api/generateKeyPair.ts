// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as bip39 from "bip39";
import hdkey from "hdkey";
import * as bitcoin from "bitcoinjs-lib";

export interface KeyPairInterface {
    publicKey: string;
    privateKey: string;
}

export default async (req, res) => {
    const keyPair = bitcoin.ECPair.makeRandom();
    res.status(200).json({
        publicKey: keyPair.publicKey.toString('hex'),
        privateKey: keyPair.privateKey.toString('hex'),
    } as KeyPairInterface);
};
