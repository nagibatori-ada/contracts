import {Action, Asset, Context, Contract, ContractState, Ctx, Param, Payments, State, assert} from "@wavesenterprise/contract-core";

@Contract()
export default class Swap {
    @State state: ContractState;
    @Ctx context: Context;

    @Action({onInit: true}) 
    initCall(){
        this.state.setBool("swapAvailable", false);
        this.state.setString("governanceId", "FcMhcz4HMprUD9AfDTbo3p7R9vaTFjFM2hFgDb1R8NTM");
        this.state.setString("stablecoinId", "DgWTaU8EopqJo5pPQKHkN7TzUVjxmNW8raYhwwTQJCkV");
    }

    @Action()
    async swap(payments: Payments) {
        assert(await this.state.getBool("swapAvailable"), "swap is locked");
        assert(payments.length == 1, "should have 1 payment");
        assert(payments[0].assetId == (await this.state.getString("governanceId")), "payed token should be WSG");
        new Asset(await this.state.getString("assetId")).transfer(this.context.tx.sender, payments[0].amount.toNumber());
    }
}
