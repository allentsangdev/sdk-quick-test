import { Ludex, Chain } from "@ludex-labs/ludex-sdk-js";
import { expect } from "chai";
import dotenv from "dotenv";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
dotenv.config();

describe("Vault Class Error Handling Tests", () => {
  const defaultTestTimeout = 30000;
  const LUDEX_CLIENT_API_KEY = process.env.LUDEX_CLIENT_API_KEY;
  const LUDEX_PROTOCOL_API = process.env.LUDEX_PROTOCAL_API;
  const ludexVaultAPI = new Ludex.ClientScoped(
    LUDEX_CLIENT_API_KEY as string,
    {
      baseUrl: LUDEX_PROTOCOL_API,
    }
  ).vault;

  before(async () => {});
  /*-------------------------------------------- getVault -------------------------------------------- */
  it("getVault : it should return a zod error on the Chain", async function () {
    this.timeout(defaultTestTimeout);
    // @ts-ignore
    await expect(ludexVaultAPI.getVault('abc')).to.eventually.be.rejected;
    // @ts-ignore
    const error = await ludexVaultAPI.getVault('abc').catch((err) => err);
    expect(error.name).to.be.eq("ZodError")
    expect(error.errors[0].message).to.be.eq("Invalid enum value. Expected 'SOLANA' | 'AVALANCHE', received 'abc'");
  });

  it("getVault : it should return a AxiosError: ZodError from the API", async function () {
    this.timeout(defaultTestTimeout);
    // @ts-ignore
    await expect(ludexVaultAPI.getVault(Chain.Enum.AVALANCHE)).to.eventually.be.rejected;
    // @ts-ignore
    const error = await ludexVaultAPI.getVault(Chain.Enum.AVALANCHE).catch((err) => err);
    expect(error.name).to.be.eq("AxiosError")
    expect(error.response.data.message).to.be.eq("Invalid enum value. Expected 'SOLANA', received 'AVALANCHE'");
  });



});
