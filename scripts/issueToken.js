const {We} = require('@wavesenterprise/sdk');
const {TRANSACTIONS} = require('@wavesenterprise/transactions-factory');
const {Keypair} = require("@wavesenterprise/signer");

const SEED = 'thing action ugly exclude usage day victory file panel jeans oxygen melody upset employ tool'
const NODE_URL = 'https://hackathon.welocal.dev/node-0/';
const sdk = new We(NODE_URL)

const call = process.argv[2];
console.log("Call ", {call})
/*
 USDC AuvzmvQya8CrRUyBT3YT7Mrb2HDxcMHGUNQoeD5e9HE9
 ETH 4QKPA44FDX3ihQfukogY9FhVzoiTnXSKckjSr6nzJasg
 WSG FcMhcz4HMprUD9AfDTbo3p7R9vaTFjFM2hFgDb1R8NTM
 WSS DgWTaU8EopqJo5pPQKHkN7TzUVjxmNW8raYhwwTQJCkV
*/

async function issueToken() {
    const config = await sdk.node.config()
    const fee = config.minimumFee[3]
    const keypair = await Keypair.fromExistingSeedPhrase(SEED);
    const tx = TRANSACTIONS.Issue.V2({
        name: "WSStable",
        chainId: "V".charCodeAt(0),
        quantity: 100000000000000,
        decimals: 8,
        reissuable: true,
        description: "WavesSwap Stablecoin",
        senderPublicKey: await keypair.publicKey(),
        fee
    });
    const signedTx = await sdk.signer.getSignedTx(tx, SEED);
    const res = await sdk.broadcast(signedTx);
    console.log(res)
}


issueToken()
    .then(() => {
        console.log('Successfully executed')
    })
    .catch(console.error)
