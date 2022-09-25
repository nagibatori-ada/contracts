const {We} = require('@wavesenterprise/sdk');
const {TRANSACTIONS} = require('@wavesenterprise/transactions-factory');
const {Keypair} = require("@wavesenterprise/signer");


const SEED = 'thing action ugly exclude usage day victory file panel jeans oxygen melody upset employ tool'
const NODE_URL = 'https://hackathon.welocal.dev/node-0/';
const sdk = new We(NODE_URL)
/*
Contract at 85vi4i35p8UUY9nVw6WsarX65dF97YXUhwgQ8Hzk8Yvg
*/
async function create() {
    const config = await sdk.node.config()
    const fee = config.minimumFee[103]
    const keypair = await Keypair.fromExistingSeedPhrase(SEED);
    const tx = TRANSACTIONS.CreateContract.V5({
        fee: fee,
        imageHash: '8fcaa1124ead20b00afe9f05321f761cce08381f50deaaee7cf2ae39e925be26',
        image: 'strukovsky/contract_airdrop:1.0.0',
        validationPolicy: {type: "any"},
        senderPublicKey: await keypair.publicKey(),
        params: [],
        payments: [
           {
            assetId: "FcMhcz4HMprUD9AfDTbo3p7R9vaTFjFM2hFgDb1R8NTM",
            amount: 500000000000
           }
        ],
        contractName: 'airdrop',
        apiVersion: '1.0'
    })
    const signedTx = await sdk.signer.getSignedTx(tx, SEED);
    console.log(signedTx.getRawBody())
    const res = await sdk.broadcast(signedTx);
    console.log(res)
}

create()
    .then(() => {
        console.log('Successfully executed')
    })
    .catch(console.error)
