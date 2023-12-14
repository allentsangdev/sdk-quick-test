import {
    Ludex,
    Chain,
    RedeemType,
  } from "@ludex-labs/ludex-sdk-js";

const LUDEX_CLIENT_API_KEY = "ac68ca57-0d29-43ce-9042-ae6f75a1b57a";

const ludexVaultAPI = new Ludex.ClientScoped(LUDEX_CLIENT_API_KEY as string).vault;

const transaction = {
  chain: Chain.SOLANA,
  type: RedeemType.tokensForNative,
  gasless: false,
  playerPublicKey: '6ofyGkHGZzFvLqeYuLoV5MVnNGT9yNqkgicCfZpAYGRa',
  amountGiven: 0.0001,
  amountRedeemed: 1000,
  receiveMint: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
};

ludexVaultAPI.generateTransaction(transaction).then((response)=>{
    console.log(response.data)
})


// https://api.ludex.gg/api/v1/vault/get-tx?
// type=tokensForNative&
// user=6ofyGkHGZzFvLqeYuLoV5MVnNGT9yNqkgicCfZpAYGRa&
// amountGiven=0.0001&
// amountRedeemed=1000&
// receiveMint=DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263
