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

describe("Login with right user and wrong password", function() {
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

describe("Security API requests", function() {
  const api = request.agent(app);

  it("login should return 200", function(done) {
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

  it("should return a list of users", function(done) {
    api
      .get("/api/security/user")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect("Content-Length", "185")
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body);
        done();
      });
  });

  it("should return a user id", function(done) {
    api
      .post("/api/security/user")
      .type("form")
      .send({
        name: "someuser",
        display_name: "Some User",
        password: "somepassword",
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body);
        done();
      });
  });

  it("logout should return 200", function(done) {
    api
      .get("/logout")
      .expect(200)
      .end(done);
  });  
});
