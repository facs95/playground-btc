import * as bitcoin from "bitcoinjs-lib";

export interface KeyPairInterface {
    publicKey: string;
    privateKey: string;
}

export default async (_, res) => {
    const keyPair = bitcoin.ECPair.makeRandom();
    res.status(200).json({
        publicKey: keyPair.publicKey.toString("hex"),
        privateKey: keyPair.privateKey.toString("hex"),
    } as KeyPairInterface);
};
