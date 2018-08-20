const app = require("../../app");
const request = require("supertest");
const chai = require("chai");
chai.use(require("chai-http"));
expect = chai.expect;

describe("GET /api/user without logging in", function() {
  const api = request(app);
  it("should return 401", function(done) {
    api
      .get("/api/user")
      .expect(401)
      .end(done);
  });
});

describe("POST /login with wrong user and password", function() {
  const api = request(app);
  it("should return 401", function(done) {
    api
      .post("/login")
      .type("form")
      .send({
        username: "adminxx",
        password: "somepassword"
      })
      .expect(401)
      .end(done);
  });
});

describe("POST /login with right user and wrong password", function() {
  const api = request(app);
  it("should return 401", function(done) {
    api
      .post("/login")
      .type("form")
      .send({
        username: "admin",
        password: "somepassword"
      })
      .expect(401)
      .end(done);
  });
});

describe("POST /login with correct user and password", function() {
  const api = request(app);
  it("should return 401", function(done) {
    api
      .post("/login")
      .type("form")
      .send({
        username: "admin",
        password: "admin"
      })
      .expect(200)
      .end(done);
  });
});
