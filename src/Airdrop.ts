import { Action, assert, Asset, Context, Contract, ContractState, Ctx, State } from "@wavesenterprise/contract-core";

@Contract()
export default class Airdrop {
    @State state: ContractState;
    @Ctx context: Context;

    @Action({onInit: true}) 
    initCall(){
        this.state.setString("assetId", "FcMhcz4HMprUD9AfDTbo3p7R9vaTFjFM2hFgDb1R8NTM");
    }

    @Action()
    async requestAssets() {
        new Asset(await this.state.getString("assetId")).transfer(this.context.tx.sender, 10000);
    }
}
