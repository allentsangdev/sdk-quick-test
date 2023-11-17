import { Ludex, Chain, PayoutState, PayoutType } from "@ludex-labs/ludex-sdk-js";
import { expect } from "chai";
import dotenv from "dotenv";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
dotenv.config();

describe("Payout Class Error Handling Tests", () => {
  const defaultTestTimeout = 30000;
  const LUDEX_ORGANIZATION_API_KEY = process.env.LUDEX_ORGANIZATION_API_KEY;
  const LUDEX_PROTOCOL_API = process.env.LUDEX_PROTOCAL_API;
  const ludexChallengeAPI = new Ludex.OrganizationScoped(
    LUDEX_ORGANIZATION_API_KEY as string,
    {
      baseUrl: LUDEX_PROTOCOL_API,
    }
  ).payout;

  before(async () => {});

  /*-------------------------------------------- getPayout -------------------------------------------- */
  it("getPayout : it should return a zod error on the payoutId", async function () {
    this.timeout(defaultTestTimeout);
    // @ts-ignore
    await expect(ludexChallengeAPI.getPayout('abc')).to.eventually.be.rejected;
    // @ts-ignore
    const error = await ludexChallengeAPI.getPayout('abc').catch((err) => err);
    expect(error.name).to.be.eq("ZodError")
    expect(error.errors[0].message).to.be.eq("Expected number, received string");
  });

  it("getPayout : it should return a AxiosError: Payout not available", async function () {
    this.timeout(defaultTestTimeout);
    await expect(ludexChallengeAPI.getPayout(999999)).to.eventually.be.rejected;
    const error = await ludexChallengeAPI.getPayout(999999).catch((err) => err);
    expect(error.name).to.be.eq("AxiosError")
    expect(error.response.data.message).to.be.eq("Payout not available");
  });

  /*-------------------------------------------- getPayouts -------------------------------------------- */
  it("getPayouts : it should return a zod error on the payoutId", async function () {
    this.timeout(defaultTestTimeout);
    const filter = {
        mintId: 'abc' ,
        state: 'abc' ,
        type: 'abc' ,
        chain: 'abc' ,
        cursor: 'abc' ,
        pageLimit: 'abc'
    }
    // @ts-ignore
    await expect(ludexChallengeAPI.getPayouts(filter)).to.eventually.be.rejected;
    // @ts-ignore
    const error = await ludexChallengeAPI.getPayouts(filter).catch((err) => err);
    expect(error.name).to.be.eq("ZodError")
    expect(error.errors[0].message).to.be.eq("Expected number, received string");
    expect(error.errors[1].message).to.be.eq("Invalid enum value. Expected 'APPROVED' | 'PENDING' | 'REJECTED' | 'ARCHIVED', received 'abc'");
    expect(error.errors[2].message).to.be.eq("Invalid enum value. Expected 'NATIVE' | 'FT' | 'NFT', received 'abc'");
    expect(error.errors[3].message).to.be.eq("Invalid enum value. Expected 'SOLANA' | 'AVALANCHE', received 'abc'");
    expect(error.errors[4].message).to.be.eq("Expected number, received string");
    expect(error.errors[5].message).to.be.eq("Expected number, received string");
  });

  it("getPayouts : it should return a AxiosError: Page limit too high", async function () {
    this.timeout(defaultTestTimeout);
    const filter = {
        mindId: 1 ,
        state: PayoutState.Enum.APPROVED,
        type: PayoutType.Enum.FT,
        chain: Chain.Enum.SOLANA,
        cursor: 1 ,
        pageLimit: 100000,
    }
    
    await expect(ludexChallengeAPI.getPayouts(filter)).to.eventually.be.rejected;
    const error = await ludexChallengeAPI.getPayouts(filter).catch((err) => err);
    expect(error.name).to.be.eq("AxiosError")
    expect(error.response.data.message).to.be.eq("Page limit too high");
  });

});
