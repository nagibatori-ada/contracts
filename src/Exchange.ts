import {Action, Asset, Context, Contract, ContractState, Ctx, Param, Payments, State, assert} from "@wavesenterprise/contract-core";

@Contract()
export default class Exchange {
    @State state: ContractState;
    @Ctx context: Context;

    @Action ({onInit: true})
    initCall() {
        this.state.setInt("amountA", 500000000000);
        this.state.setInt("weightA", 3);
        this.state.setInt("amountB", 500000000000);
        this.state.setInt("weightB", 5);
        this.state.setString("idA", "AuvzmvQya8CrRUyBT3YT7Mrb2HDxcMHGUNQoeD5e9HE9");
        this.state.setString("idB", "4QKPA44FDX3ihQfukogY9FhVzoiTnXSKckjSr6nzJasg");
        this.state.setString("idLiquidity", "FcMhcz4HMprUD9AfDTbo3p7R9vaTFjFM2hFgDb1R8NTM");
        this.state.setInt("liquidityFeeBasePoints", 26); // 0,26%
        this.state.setInt("nftFeeBasePoints", 4); // 0,04%
        this.state.setString("liquidityProviders", JSON.stringify([])); // empty liquidity dictionary
        this.state.setString("deployerAddress", this.context.tx.sender);
        this.state.setInt("totalLiquidityReward", 0);
        this.state.setInt("nftReward", 0);
    }

    @Action()
    async getAmountA() {
        return this.state.getInt("amountA");
    }

    @Action()
    async getAmountB() {
        return this.state.getInt("amountB");
    }

    @Action
    async dedicateLiquidityProviderReward() {
        assert(this.context.tx.sender === (await this.state.getString("deployerAddress")), "should be admin")
        const rewardedUsers: Array<{address: string, investment: number}> = JSON.parse(await this.state.getString("liquidityProviders"));
        const totalReward = await this.state.getInt("totalLiquidityReward");
        let totalInvestment = 0;
        rewardedUsers.forEach(rewarded => {
            totalInvestment += rewarded.investment;
        });
        const liquidityAsset = new Asset(await this.state.getString("idLiquidity"));
        rewardedUsers.forEach(rewarded => {
            const amountAccruedToRewarded= rewarded.investment / totalInvestment * totalReward;
            liquidityAsset.transfer(rewarded.address, amountAccruedToRewarded);
        });
        this.state.setInt("totalLiquidityReward", 0);
    }

    async addToTotalLiquidityReward(reward: number) {
        const currentTotalReward = await this.state.getInt("totalLiquidityReward");
        this.state.setInt("totalLiquidityReward", currentTotalReward + reward);
    }

    async addToNftReward(reward: number) {
        const currentTotalReward = await this.state.getInt("nftReward");
        this.state.setInt("nftReward", currentTotalReward + reward);
    }

    async applyFeeToAmount(initialAmount: number) {
        const nftFee = initialAmount / 10000 * (await this.state.getInt("nftFeeBasePoints"));
        const liquidityFee = initialAmount / 10000 * (await this.state.getInt("liquidityFeeBasePoints"));
        return {
            amount: initialAmount - nftFee - liquidityFee,
            nftFee,
            liquidityFee
        };
    }

    @Action()
    async buyB(payments: Payments) {
        assert(payments[0].assetId == await this.state.getString("idA"), "Payment should be of A");
        const initialAmount = payments[0].amount.toNumber(); // before any fee
        const {amount, liquidityFee, nftFee} = await this.applyFeeToAmount(initialAmount); // when fees are dedicated
        const amountA = await this.state.getInt("amountA");
        const amountB = await this.state.getInt("amountB");
        const weightB = await this.state.getInt("weightB");
        const weightA = await this.state.getInt("weightA");
        const changedAmountA = amountA + amount;
        const changedAmountB = amountB * Math.pow((amountA / changedAmountA), (weightA / weightB));
        const outputB = amountB - changedAmountB;
        assert(amount <= await this.state.getInt("amountA"), "Too big amount for A");
        assert(outputB <= await this.state.getInt("amountB"), "Too big amount for B");
        new Asset(await this.state.getString("idB")).transfer(this.context.tx.sender, outputB);
        this.addToTotalLiquidityReward(liquidityFee);
        this.addToNftReward(nftFee);
        return outputB;
    }

    @Action()
    async buyA(payments: Payments) {
        assert(payments[0].assetId == await this.state.getString("idB"), "Payment should be of B");
        const initialAmount = payments[0].amount.toNumber(); // before any fee
        const {amount, liquidityFee, nftFee} = await this.applyFeeToAmount(initialAmount); // when fees are dedicated
        const amountA = await this.state.getInt("amountA");
        const amountB = await this.state.getInt("amountB");
        const weightB = await this.state.getInt("weightB");
        const weightA = await this.state.getInt("weightA");
        const changedAmountB = amountB + amount;
        const changedAmountA = amountA * Math.pow((amountB / changedAmountB), (weightB / weightA));
        const outputA = amountA - changedAmountA;
        assert(amount <= await this.state.getInt("amountB"), "Too big amount for B");
        assert(outputA <= await this.state.getInt("amountA"), "Too big amount for A");
        new Asset(await this.state.getString("idA")).transfer(this.context.tx.sender, outputA);
        this.addToTotalLiquidityReward(liquidityFee);
        this.addToNftReward(nftFee);
        return outputA;
    }

    @Action
    async provideLiquidity(payments: Payments) {
        assert(payments.length == 2, "Payments count should be exactly 2")
        assert(payments[0].assetId == await this.state.getString("idA"), "Payment should be of A");
        assert(payments[1].assetId == await this.state.getString("idB"), "Payment should be of B");
        const amountA = await this.state.getInt("amountA");
        const amountB = await this.state.getInt("amountB");
        this.state.setInt("amountA", amountA + payments[0].amount.toNumber());
        this.state.setInt("amountB", amountB + payments[1].amount.toNumber());
        const providers: Array<{address: string, investment: number}> = JSON.parse(await this.state.getString("liquidityProviders"));
        const address = this.context.tx.sender;
        const investment = payments[0].amount.toNumber() + payments[1].amount.toNumber();
        let alreadyInLiquidityPool = false;
        providers.some(provider => {
            if(provider.address == address) {
                provider.investment += investment
                alreadyInLiquidityPool = true;
                return true;
            }
        });
        if (!alreadyInLiquidityPool) {
            providers.push({
                address,
                investment
            })
        }
    }
}
