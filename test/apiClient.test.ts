import { Ludex } from "@ludex-labs/ludex-sdk-js";
import { expect } from "chai";
import dotenv from "dotenv";
dotenv.config();

describe("apiClient Class Error Handling Tests", () => {
  const defaultTestTimeout = 30000;

  const createApiClient = () => {
    // @ts-ignore
    return new Ludex.ClientScoped(123,{baseUrl: 123,})
  }
  
  before(async () => {});
  /*-------------------------------------------- apiClient -------------------------------------------- */
  it("apiClient : it should return a zod error apikey and baseUrl", async function () {
    this.timeout(defaultTestTimeout);
    try {
        createApiClient()
    } catch(error : any) {
        expect(error.name).to.be.eq("ZodError")
        expect(error.errors[0].message).to.be.eq("Expected string, received number");
    }
  });

});
