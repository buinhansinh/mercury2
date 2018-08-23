const db = require("../db/connection");
const q = require("../db/query");
const app = require("../../app");
const request = require("supertest");
const chai = require("chai");

chai.use(require("chai-http"));
expect = chai.expect;

describe("Requests without login", function() {
  const api = request(app);
  it("should return 401", function(done) {
    api
      .get("/api/security/user")
      .expect(401)
      .end(done);
  });
});

describe("Login in with wrong user and password", function() {
  const api = request(app);
  it("should return 401", function(done) {
    api
      .post("/api/login")
      .type("form")
      .send({
        username: "adminxx",
        password: "somepassword"
      })
      .expect(401)
      .end(done);
  });
});

describe("Login with right user and wrong password", function() {
  const api = request(app);
  it("should return 401", function(done) {
    api
      .post("/api/login")
      .type("form")
      .send({
        username: "admin",
        password: "somepassword"
      })
      .expect(401)
      .end(done);
  });
});

function login(api) {
  return function(done) {
    api
      .post("/api/login")
      .type("form")
      .send({
        username: "admin",
        password: "admin"
      })
      .expect(200)
      .end(done);
  };
}

function logout(api) {
  return function(done) {
    api
      .get("/api/logout")
      .expect(200)
      .end(done);
  };
}

module.exports = { login, logout };
