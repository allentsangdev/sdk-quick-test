import { Ludex } from "@ludex-labs/ludex-sdk-js";
import { expect } from "chai";
import dotenv from "dotenv";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
dotenv.config();

describe("Challenge Class Error Handling Tests", () => {
  const defaultTestTimeout = 30000;
  const LUDEX_CLIENT_API_KEY = process.env.LUDEX_CLIENT_API_KEY;
  const LUDEX_PROTOCOL_API = process.env.LUDEX_PROTOCAL_API;
  const ludexChallengeAPI = new Ludex.ClientScoped(
    LUDEX_CLIENT_API_KEY as string,
    {
      baseUrl: LUDEX_PROTOCOL_API,
    }
  ).challenge;

  before(async () => {});

  //   it("getChallenge : it should return a zod error", async function () {
  //     this.timeout(defaultTestTimeout);
  //     await expect(ludexChallengeAPI.getChallenge("abc" as unknown as number)).to.eventually.be.rejectedWith(ZodError);
  //     // await expect(ludexChallengeAPI.getChallenge("abc" as unknown as number)).to.eventually.throw("Expected number, received string");
  //     // expect(await ludexChallengeAPI.getChallenge("abc" as unknown as number)).to.throw(ZodError)
  //   });

  /*-------------------------------------------- getChallenge -------------------------------------------- */
  it("getChallenge : it should return a zod error on the challengeId", async function () {
    this.timeout(defaultTestTimeout);
    // @ts-ignore
    await expect(ludexChallengeAPI.getChallenge('abc')).to.eventually.be.rejected;
    // @ts-ignore
    const error = await ludexChallengeAPI.getChallenge('abc').catch((err) => err);
    expect(error.name).to.be.eq("ZodError")
    expect(error.errors[0].message).to.be.eq("Expected number, received string");
  });

  it("getChallenge : it should return a AxiosError: Challenge not found", async function () {
    this.timeout(defaultTestTimeout);
    // @ts-ignore
    await expect(ludexChallengeAPI.getChallenge(999999)).to.eventually.be.rejected;
    // @ts-ignore
    const error = await ludexChallengeAPI.getChallenge(999999).catch((err) => err);
    expect(error.name).to.be.eq("AxiosError")
    expect(error.response.data.message).to.be.eq("Challenge not found");
  });

  /*-------------------------------------------- getChallenges -------------------------------------------- */
  it("getChallenges : it should return a zod error on every field of the filter object", async function () {
    this.timeout(defaultTestTimeout);
    const filter = {
      payoutId: 'abc',
      environment: 'sandbox',
      state: 'OK',
      type: 'SNFT',
      chain: 'ETH',
      page: 123,
      pageLimit: 'abc'
    }
    // @ts-ignore
    await expect(ludexChallengeAPI.getChallenges(filter)).to.eventually.be.rejected;
    // @ts-ignore
    const error = await ludexChallengeAPI.getChallenges(filter).catch((err) => err);
    expect(error.name).to.be.eq("ZodError")
    expect(error.errors[0].message).to.be.eq("Expected number, received string");
    expect(error.errors[1].message).to.be.eq("Invalid enum value. Expected 'MAINNET' | 'DEVNET', received 'sandbox'");
    expect(error.errors[2].message).to.be.eq("Invalid enum value. Expected 'CREATING' | 'CREATED' | 'LOCKING' | 'LOCKED' | 'CANCELING' | 'CANCELED' | 'RESOLVING' | 'RESOLVED' | 'VERIFYING_CANCEL' | 'VERIFYING_RESOLVE' | 'VERIFIED_CANCEL' | 'VERIFIED_RESOLVE' | 'REDEEMING_CANCEL' | 'REDEEMING_RESOLVE' | 'REDEEMED_CANCEL' | 'REDEEMED_RESOLVE', received 'OK'");
    expect(error.errors[3].message).to.be.eq("Invalid enum value. Expected 'NATIVE' | 'FT' | 'NFT', received 'SNFT'");
    expect(error.errors[4].message).to.be.eq("Invalid enum value. Expected 'SOLANA' | 'AVALANCHE', received 'ETH'");
    expect(error.errors[5].message).to.be.eq("Expected string, received number");
    expect(error.errors[6].message).to.be.eq("Expected number, received string");
  });
  
  
  it("getChallenges : it should return a Axios error: Page limit too high", async function () {
    this.timeout(defaultTestTimeout);
    const filter = {
      pageLimit: 999999,
    }
    await expect(ludexChallengeAPI.getChallenges(filter)).to.eventually.be.rejected;
    const error = await ludexChallengeAPI.getChallenges(filter).catch((err) => err);
    expect(error.name).to.be.eq("AxiosError")
    expect(error.response.data.message).to.be.eq('Page limit too high')
  });

  it("getChallenges : it should not return error with no params", async function () {
    this.timeout(defaultTestTimeout);
    // @todo : remove ts-ignore after merging the SDK filter fix PR
    // @ts-ignore
    const response = await ludexChallengeAPI.getChallenges()
    console.log(response.data)
    expect(response).to.be.an('object')
    expect(response.data).to.have.property('challenges')
    expect(response.data).to.have.property('remainingRecords')
  });

  /*-------------------------------------------- createChallenge -------------------------------------------- */
  it("createChallenge : it should return ZodError on every field of the challenge object", async function () {
    this.timeout(defaultTestTimeout);
    const challenge = {
      payoutId: 'abc',
      limit: 'abc' ,
      isVerified: 'abc'
    }
    // @ts-ignore
    await expect(ludexChallengeAPI.createChallenge(challenge)).to.eventually.be.rejected;
    // @ts-ignore
    const error = await ludexChallengeAPI.createChallenge(challenge).catch((err) => err);
    expect(error.name).to.be.eq("ZodError")
    expect(error.errors[0].message).to.be.eq("Expected number, received string");
    expect(error.errors[1].message).to.be.eq("Expected number, received string");
    expect(error.errors[2].message).to.be.eq("Expected boolean, received string");
  });

  it("createChallenge : it should return a AxiosError: Player limit must be larger than 1", async function () {
    this.timeout(defaultTestTimeout);
    const challenge = {
      payoutId: 31,
      limit: 1,
    }
    // @ts-ignore
    await expect(ludexChallengeAPI.createChallenge(challenge)).to.eventually.be.rejected;
    // @ts-ignore
    const error = await ludexChallengeAPI.createChallenge(challenge).catch((err) => err);
    console.log(error)
    expect(error.name).to.be.eq("AxiosError")
    expect(error.response.data.message).to.be.eq('Player limit must be larger than 1')
  });
  
});
