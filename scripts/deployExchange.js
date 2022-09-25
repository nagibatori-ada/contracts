const {We} = require('@wavesenterprise/sdk');
const {TRANSACTIONS} = require('@wavesenterprise/transactions-factory');
const {Keypair} = require("@wavesenterprise/signer");


const SEED = 'thing action ugly exclude usage day victory file panel jeans oxygen melody upset employ tool'
const NODE_URL = 'https://hackathon.welocal.dev/node-0/';
const sdk = new We(NODE_URL)
/*
Contract at 3t1eC1rzmmwseBxXqyfJf3QLupFRSv39CSSQQ9eG8eB4
Updated one 7x1VsK64f8dv5yscLMscEs8fEGLDkT2R2Xw3hFj4dGNc
Last one CVtHxvqtKpMUDBs78UK3MDp4vGyRX4UyUEtPTSVqKb1s
*/
async function create() {
    const config = await sdk.node.config()
    const fee = config.minimumFee[103]
    const keypair = await Keypair.fromExistingSeedPhrase(SEED);
    const tx = TRANSACTIONS.CreateContract.V5({
        fee: fee,
        imageHash: 'f88d57acdd1ad42c5191709e25492524250fc1614302ae21eaf4441309a292f6',
        image: 'strukovsky/contract_exchange:1.0.0',
        validationPolicy: {type: "any"},
        senderPublicKey: await keypair.publicKey(),
        params: [],
        payments: [
           {
            assetId: "AuvzmvQya8CrRUyBT3YT7Mrb2HDxcMHGUNQoeD5e9HE9",
            amount: 500000000000
           },
           {
            assetId: "4QKPA44FDX3ihQfukogY9FhVzoiTnXSKckjSr6nzJasg",
            amount: 500000000000
           },
        ],
        contractName: 'exchange',
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
