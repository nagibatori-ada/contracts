const {We} = require('@wavesenterprise/sdk');
const {TRANSACTIONS} = require('@wavesenterprise/transactions-factory');
const {Keypair} = require("@wavesenterprise/signer");


const SEED = 'thing action ugly exclude usage day victory file panel jeans oxygen melody upset employ tool'
const NODE_URL = 'https://hackathon.welocal.dev/node-0/';
const sdk = new We(NODE_URL)
/*
Contract at 6ydeLSrWRJAajAvfW8YUkyduuCgZpZ8myhvsbxXgsGNQ
*/
async function create() {
    const config = await sdk.node.config()
    const fee = config.minimumFee[103]
    const keypair = await Keypair.fromExistingSeedPhrase(SEED);
    const tx = TRANSACTIONS.CreateContract.V5({
        fee: fee,
        imageHash: '78658e175514a9335f98b19f85558a9459598084178dab636f57841f41e1ec15',
        image: 'strukovsky/contract_swap:1.0.0',
        validationPolicy: {type: "any"},
        senderPublicKey: await keypair.publicKey(),
        params: [],
        payments: [
           {
            assetId: "DgWTaU8EopqJo5pPQKHkN7TzUVjxmNW8raYhwwTQJCkV",
            amount: 5000000000000
           }
        ],
        contractName: 'swap',
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
