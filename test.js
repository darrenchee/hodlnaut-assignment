import chai from "chai";
import axios from "axios";

const { expect } = chai;

describe("Tests", () => {
  it("Get Balance Test (success)", async () => {
    try {
      let response = await axios.get("https://balance-api-interview-task-2.darrenchee1.repl.co/getBalance/1");
      expect(response.status).to.equal(200);
    } catch (error) {
      console.log(error);
    }
  });

  it("Get Balance Test (user not found)", async () => {
    try {
      let response = await axios.get("https://balance-api-interview-task-2.darrenchee1.repl.co/getBalance/4");
      expect(response.status).to.equal(404);
    } catch (error) {
      console.log("HTTP Response for user not found: ", error.response.status);
    }
  });
});
