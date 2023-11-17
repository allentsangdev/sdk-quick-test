import { Ludex } from "@ludex-labs/ludex-sdk-js";
import { expect } from "chai";
import { ZodError } from "zod";
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
  it("getChallenge : it should return a zod error", async function () {
    this.timeout(defaultTestTimeout);
    try {
      // @ts-ignore
      await ludexChallengeAPI.getChallenge("abc");
    } catch (error: any) {
      expect(error.errors[0].message).to.be.eq(
        "Expected number, received string"
      );
    }
  });

  it("getChallenge : it should return a Axios error", async function () {
    this.timeout(defaultTestTimeout);
    try {
      await ludexChallengeAPI.getChallenge(99999);
    } catch (error: any) {
      expect(error.response.data.message).to.be.eq("Challenge not found");
    }
  });

  /*-------------------------------------------- getChallenges -------------------------------------------- */
  it("getChallenge : it should return a zod error", async function () {
    this.timeout(defaultTestTimeout);
    try {
      const filter = {
        payoutId: 'abc',
        environment: 'sandbox'
      }
      // @ts-ignore
      await ludexChallengeAPI.getChallenges(filter);
    } catch (error: any) {
      console.log(error)
      expect(error.errors[0].message).to.be.eq(
        "Expected number, received string"
      );
      expect(error.errors[1].message).to.be.eq(
        "Invalid enum value. Expected 'MAINNET' | 'DEVNET', received 'sandbox'");
    }
  });
  
  // it("getChallenges : it should return a Axios error", async function () {
  //   this.timeout(defaultTestTimeout);
  //   try {
  //     await ludexChallengeAPI.getChallenge(99999);
  //   } catch (error: any) {
  //     expect(error.response.data.message).to.be.eq("Challenge not found");
  //   }
  // });

});
