import {
  Ludex,
  AxiosError,
  ZodError,
  Chain,
  PayoutType,
  PayoutState,
  Environment,
  ChallengeState,
  RedeemType,
} from "@ludex-labs/ludex-sdk-js";
import { expect } from "chai";
import dotenv from "dotenv";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
dotenv.config();

describe("ZodError, AxiosError and Native Enum Tests", () => {
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
  /*-------------------------------------------- getChallenge -------------------------------------------- */
  it("getChallenge : it should return a zod error on the challengeId", async function () {
    this.timeout(defaultTestTimeout);
    try {
      const clientApiKey = LUDEX_CLIENT_API_KEY as string;
      const ludexChallengeApi = new Ludex.ClientScoped(clientApiKey).challenge;
      const challengeId = "1";
      // @ts-ignore
      const response = await ludexChallengeApi.getChallenge(challengeId);
      const challenge = response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("HTTP error status:", error.response?.status);
        /* you can also extract more data from the Axios error using the following fields */
        console.error("HTTP error code:", error.response?.data.code);
        console.error(
          "Explanation of the error:",
          error.response?.data.message
        );
        expect(error.name).to.be.eq("AxiosError");
      } else if (error instanceof ZodError) {
        console.error("Validation error details:", error.errors);
        expect(error.name).to.be.eq("ZodError");
        expect(error.errors[0].message).to.be.eq(
          "Expected number, received string"
        );
      } else if (error instanceof Error) {
        console.error("Unexpected error:", error.message);
      }
    }
  });

  it("getChallenge : it should return a AxiosError on challenge not found", async function () {
    this.timeout(defaultTestTimeout);
    try {
      const clientApiKey = LUDEX_CLIENT_API_KEY as string;
      const ludexChallengeApi = new Ludex.ClientScoped(clientApiKey).challenge;
      const challengeId = 9999;
      const response = await ludexChallengeApi.getChallenge(challengeId);
      const challenge = response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("HTTP error status:", error.response?.status);
        /* you can also extract more data from the Axios error using the following fields */
        console.error("HTTP error code:", error.response?.data.code);
        console.error(
          "Explanation of the error:",
          error.response?.data.message
        );
        expect(error.name).to.be.eq("AxiosError");
      } else if (error instanceof ZodError) {
        console.error("Validation error details:", error.errors);
        expect(error.name).to.be.eq("ZodError");
        expect(error.errors[0].message).to.be.eq(
          "Expected number, received string"
        );
      } else if (error instanceof Error) {
        console.error("Unexpected error:", error.message);
      }
    }
  });

  it("getChallenges : it should return challenge not found", async function () {
    this.timeout(defaultTestTimeout);
    try {
      const filter = {
        payoutId: 0,
        environment: Environment.DEVNET,
        state: ChallengeState.CREATED,
        type: PayoutType.NATIVE,
        chain: Chain.AVALANCHE,
      };
      ludexChallengeAPI.getChallenges(filter)
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
        expect(error.name).to.be.eq("AxiosError")
      }
      
    }
  });
});
