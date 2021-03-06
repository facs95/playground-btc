import * as bitcoin from "bitcoinjs-lib";

export interface MultiSigAddress {
    address: string;
}

export interface GenerateMultiSigAddressVars {
    pubKeys: string[]
    m: number
}

export default async (req, res) => {
    const { pubKeys, m } = JSON.parse(req.body) as GenerateMultiSigAddressVars;
    const pubKeysBuffer = pubKeys.map((hex) => Buffer.from(hex, "hex"));
    const { address } = bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2ms({ m , pubkeys: pubKeysBuffer }),
    });
    res.status(200).json({ address } as MultiSigAddress);
};
