import { Ludex, Chain, RedeemType } from "@ludex-labs/ludex-sdk-js";
import { expect } from "chai";
import dotenv from "dotenv";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
dotenv.config();

describe("apiClient Class Error Handling Tests", () => {
  const defaultTestTimeout = 30000;
  
  before(async () => {});
  /*-------------------------------------------- apiClient -------------------------------------------- */
  it("apiClient : it should return a zod error apikey and baseUrl", async function () {
    this.timeout(defaultTestTimeout);
    // @ts-ignore
    await expect( () => {new Ludex.ClientScoped(123,{baseUrl: 123,})}).to.eventually.be.rejected;
    // @ts-ignore
    const error = await ludexVaultAPI.getVault('abc').catch((err) => err);
    expect(error.name).to.be.eq("ZodError")
    expect(error.errors[0].message).to.be.eq("Invalid enum value. Expected 'SOLANA' | 'AVALANCHE', received 'abc'");
  });

});
