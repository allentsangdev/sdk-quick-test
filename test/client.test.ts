import {
  Ludex,
  Chain,
  PayoutState,
  PayoutType,
} from "@ludex-labs/ludex-sdk-js";
import { expect } from "chai";
import dotenv from "dotenv";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
dotenv.config();

describe("Client Class Error Handling Tests", () => {
  const defaultTestTimeout = 30000;
  const LUDEX_ORGANIZATION_API_KEY = process.env.LUDEX_ORGANIZATION_API_KEY;
  const LUDEX_PROTOCOL_API = process.env.LUDEX_PROTOCAL_API;
  const ludexClientAPI = new Ludex.OrganizationScoped(
    LUDEX_ORGANIZATION_API_KEY as string,
    {
      baseUrl: LUDEX_PROTOCOL_API,
    }
  ).client;

  before(async () => {});

  /*-------------------------------------------- getClient -------------------------------------------- */
  it("getClient : it should return a zod error on the clientId", async function () {
    this.timeout(defaultTestTimeout);
    // @ts-ignore
    await expect(ludexClientAPI.getClient("abc")).to.eventually.be.rejected;
    // @ts-ignore
    const error = await ludexClientAPI.getClient("abc").catch((err) => err);
    expect(error.name).to.be.eq("ZodError");
    expect(error.errors[0].message).to.be.eq(
      "Expected number, received string"
    );
  });

  it("getClient : it should return a AxiosError: Client not found", async function () {
    this.timeout(defaultTestTimeout);
    await expect(ludexClientAPI.getClient(999999)).to.eventually.be.rejected;
    const error = await ludexClientAPI.getClient(999999).catch((err) => err);
    expect(error.name).to.be.eq("AxiosError");
    expect(error.response.data.message).to.be.eq("Client not found");
  });

  /*-------------------------------------------- createClients -------------------------------------------- */
  it("createClient : it should return a zod error on the client name", async function () {
    this.timeout(defaultTestTimeout);
    const client = {
      name: 123,
    };
    // @ts-ignore
    await expect(ludexClientAPI.createClient(client)).to.eventually.be.rejected;
    // @ts-ignore
    const error = await ludexClientAPI.createClient(client).catch((err) => err);
    expect(error.name).to.be.eq("ZodError");
    expect(error.errors[0].message).to.be.eq(
      "Expected string, received number"
    );
  });

  /*-------------------------------------------- getOpenChallengeCount -------------------------------------------- */
  it("getOpenChallengeCOunt : it should return a zod error on the client id", async function () {
    this.timeout(defaultTestTimeout);
    // @ts-ignore
    await expect(ludexClientAPI.getOpenChallengeCount('123')).to.eventually.be.rejected;
    // @ts-ignore
    const error = await ludexClientAPI.getOpenChallengeCount('123').catch((err) => err);
    expect(error.name).to.be.eq("ZodError");
    expect(error.errors[0].message).to.be.eq(
      "Expected number, received string"
    );
  });

  it("getOpenChallengeCount : it should return a AxiosError: Client not found", async function () {
    this.timeout(defaultTestTimeout);
    await expect(ludexClientAPI.getOpenChallengeCount(999999)).to.eventually.be.rejected;
    const error = await ludexClientAPI.getOpenChallengeCount(999999).catch((err) => err);
    expect(error.name).to.be.eq("AxiosError");
    expect(error.response.data.message).to.be.eq("Client not found");
  });

  /*-------------------------------------------- updateClientWallet -------------------------------------------- */
  it("updateClientWallet : it should return a zod error on the client id", async function () {
    this.timeout(defaultTestTimeout);
    const wallet = {
        chain: 123,
        address: 123
    }
    // @ts-ignore
    await expect(ludexClientAPI.updateClientWallet('123', wallet)).to.eventually.be.rejected;
    // @ts-ignore
    const error = await ludexClientAPI.updateClientWallet('123', wallet).catch((err) => err);
    expect(error.name).to.be.eq("ZodError");
    expect(error.errors[0].message).to.be.eq("Expected number, received string");
  });

  it("updateClientWallet : it should return a zod error on the client wallet", async function () {
    this.timeout(defaultTestTimeout);
    const wallet = {
        chain: 123,
        address: 123
    }
    // @ts-ignore
    await expect(ludexClientAPI.updateClientWallet(123, wallet)).to.eventually.be.rejected;
    // @ts-ignore
    const error = await ludexClientAPI.updateClientWallet(123, wallet).catch((err) => err);
    expect(error.name).to.be.eq("ZodError");
    expect(error.errors[0].message).to.be.eq("Expected string, received number");
    expect(error.errors[1].message).to.be.eq("Expected string, received number");
  });

  it("getOpenChallengeCount : it should return a AxiosError: invalid wallet", async function () {
    this.timeout(defaultTestTimeout);
    const wallet = {
        chain: '123',
        address: '123'
    }
    await expect(ludexClientAPI.updateClientWallet(999999, wallet)).to.eventually.be.rejected;
    const error = await ludexClientAPI.updateClientWallet(999999, wallet).catch((err) => err);
    expect(error.name).to.be.eq("AxiosError");
    expect(error.response.data.message).to.be.eq("Invalid enum value. Expected 'SOLANA' | 'POLYGON' | 'SUI' | 'NEAR' | 'AVALANCHE', received '123'");
  });


});
