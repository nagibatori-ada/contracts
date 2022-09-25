# Deployments

## Airdrop (85vi4i35p8UUY9nVw6WsarX65dF97YXUhwgQ8Hzk8Yvg)
Contract provides ability to give out governance tokens at the very beginning of tokenomics
To deploy it, change contract in `index.ts`, then run `./build.sh`, execute `deployAirdrop.js`
```json
{
  "senderPublicKey": "VGUfKe2i5jX1Lfm6HqrZPanCGpfKi28sSzQtF1jvhDS",
  "image": "strukovsky/contract_airdrop:1.0.0",
  "fee": 100000000,
  "payments": [
    {
      "assetId": "FcMhcz4HMprUD9AfDTbo3p7R9vaTFjFM2hFgDb1R8NTM",
      "amount": 500000000000
    }
  ],
  "imageHash": "8fcaa1124ead20b00afe9f05321f761cce08381f50deaaee7cf2ae39e925be26",
  "type": 103,
  "params": [],
  "version": 5,
  "atomicBadge": null,
  "apiVersion": "1.0",
  "sender": "3NxEmrzgH45ri9XRJ3a9qDbGvHgn7PBNNGN",
  "feeAssetId": null,
  "proofs": [
    "5XSGczJw9Nd3MccT4UHwSqLF6s8kpffaSRZqnKYgbM7h1pyDCLTtHSsZ7VDkrkYq8YsARYAyACyaYrR3QeEupQFf"
  ],
  "contractName": "airdrop",
  "id": "85vi4i35p8UUY9nVw6WsarX65dF97YXUhwgQ8Hzk8Yvg",
  "validationPolicy": {
    "type": "any"
  },
  "timestamp": 1664091538218,
  "height": 27474
}
```
## Exchange (CVtHxvqtKpMUDBs78UK3MDp4vGyRX4UyUEtPTSVqKb1s)
Contract provides ability to exchange some pair of assets on Waves Exchange platform
To deploy it, change contract in `index.ts`, then run `./build.sh`, execute `deployExchange.js`
```json
{
  "senderPublicKey": "VGUfKe2i5jX1Lfm6HqrZPanCGpfKi28sSzQtF1jvhDS",
  "image": "strukovsky/contract_exchange:1.0.0",
  "fee": 100000000,
  "payments": [
    {
      "assetId": "AuvzmvQya8CrRUyBT3YT7Mrb2HDxcMHGUNQoeD5e9HE9",
      "amount": 500000000000
    },
    {
      "assetId": "4QKPA44FDX3ihQfukogY9FhVzoiTnXSKckjSr6nzJasg",
      "amount": 500000000000
    }
  ],
  "imageHash": "f88d57acdd1ad42c5191709e25492524250fc1614302ae21eaf4441309a292f6",
  "type": 103,
  "params": [],
  "version": 5,
  "atomicBadge": null,
  "apiVersion": "1.0",
  "sender": "3NxEmrzgH45ri9XRJ3a9qDbGvHgn7PBNNGN",
  "feeAssetId": null,
  "proofs": [
    "43u1gz27kPnxTotzBbtWXuiA9sRgqXDjY7kXhnPhPNGTgP9fp8hA9CKa7dAivPFFvLBAisn8Zv162FnCxZkEkeXU"
  ],
  "contractName": "exchange",
  "id": "CVtHxvqtKpMUDBs78UK3MDp4vGyRX4UyUEtPTSVqKb1s",
  "validationPolicy": {
    "type": "any"
  },
  "timestamp": 1664091527768,
  "height": 27472
}
```
## Swap (CVtHxvqtKpMUDBs78UK3MDp4vGyRX4UyUEtPTSVqKb1s)
Contract provides ability to swap governance token to wrapped stablecoin
To deploy it, change contract in `index.ts`, then run `./build.sh`, execute `deploySwap.js`
```json
{
  "senderPublicKey": "VGUfKe2i5jX1Lfm6HqrZPanCGpfKi28sSzQtF1jvhDS",
  "image": "strukovsky/contract_swap:1.0.0",
  "fee": 100000000,
  "payments": [
    {
      "assetId": "DgWTaU8EopqJo5pPQKHkN7TzUVjxmNW8raYhwwTQJCkV",
      "amount": 5000000000000
    }
  ],
  "imageHash": "78658e175514a9335f98b19f85558a9459598084178dab636f57841f41e1ec15",
  "type": 103,
  "params": [],
  "version": 5,
  "atomicBadge": null,
  "apiVersion": "1.0",
  "sender": "3NxEmrzgH45ri9XRJ3a9qDbGvHgn7PBNNGN",
  "feeAssetId": null,
  "proofs": [
    "4zzcR9NetB4puu7YxggSvQTp4LARYj5Bje5DgS9ZGHfbPUwsYwGRd9kTkn8EJsjVKA32NL14FPQLdksQ2EHP2zyE"
  ],
  "contractName": "swap",
  "id": "6ydeLSrWRJAajAvfW8YUkyduuCgZpZ8myhvsbxXgsGNQ",
  "validationPolicy": {
    "type": "any"
  },
  "timestamp": 1664091548639,
  "height": 27476
}
```

