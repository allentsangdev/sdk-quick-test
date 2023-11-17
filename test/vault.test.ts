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

  /*-------------------------------------------- createVault -------------------------------------------- */
  it("createVault : it should return a zod error on the vault object", async function () {
    this.timeout(defaultTestTimeout);
    const vault = {
      name: 123, 
      chain: 123,
      feeRecipient: 123
    }
    // @ts-ignore
    await expect(ludexVaultAPI.createVault(vault)).to.eventually.be.rejected;
    // @ts-ignore
    const error = await ludexVaultAPI.createVault(vault).catch((err) => err);
    expect(error.name).to.be.eq("ZodError")
    expect(error.errors[0].message).to.be.eq("Expected string, received number");
    expect(error.errors[1].message).to.be.eq("Expected 'SOLANA' | 'AVALANCHE', received number");
    expect(error.errors[2].message).to.be.eq("Expected string, received number");
  });

  it("createVault : it should return a AxiosError: Invalid public key = ", async function () {
    this.timeout(defaultTestTimeout);
    const vault = {
      name: 'test', 
      chain: Chain.Enum.SOLANA,
      feeRecipient: '0x0'
    }
    await expect(ludexVaultAPI.createVault(vault)).to.eventually.be.rejected;
    const error = await ludexVaultAPI.createVault(vault).catch((err) => err);
    expect(error.name).to.be.eq("AxiosError")
    expect(error.response.data.message).to.be.eq("Invalid public key");
  });
});
