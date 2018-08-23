const db = require("../db/connection");
const q = require("../db/query");
const app = require("../../app");
const request = require("supertest");
const chai = require("chai");

chai.use(require("chai-http"));
expect = chai.expect;

const { login, logout } = require("./auth.spec");

describe("Get Users", function() {
  const api = request.agent(app);
  before(login(api));
  after(logout(api));

  it("should return a list of users", function(done) {
    api
      .get("/api/security/user")
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body);
        done();
      });
  });
});

describe("Update User", function() {
  const api = request.agent(app);
  var userId = null;

  // login
  before(login(api));

  // insert a user
  before(function(done) {
    api
      .post("/api/security/user")
      .type("form")
      .send({
        name: "someuser",
        display_name: "Some User",
        password: "somepassword"
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body);
        userId = res.body.id;
        done();
      });
  });

  // update the user with the same name
  it("should return 409", function(done) {
    api
      .put(`/api/security/user/${userId}`)
      .type("form")
      .send({
        id: userId,
        name: "someuser",
        display_name: "Some Updated User",
        active: "False"
      })
      .expect(409)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body);
        done();
      });
  });

  // update the user agin
  it("should return 200", function(done) {
    api
      .put(`/api/security/user/${userId}`)
      .type("form")
      .send({
        id: userId,
        name: "someupdateduser",
        display_name: "Some Updated User",
        active: "False"
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body);
        done();
      });
  });

  it("should return 2 users", function(done) {
    api
      .get("/api/security/user")
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body);
        done();
      });
  });

  // delete the user
  after(function(done) {
    api
      .delete(`/api/security/user/${userId}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body);
        done();
      });
  });

  // logout
  after(logout(api));
});

describe("Update user password", function() {
  const api = request.agent(app);
  var admin = null;

  before(login(api));
  before(async () => {
    admin = await q(db).user.getByName("admin");
  });

  after(logout(api));

  it("should return 200", function(done) {
    api
      .put(`/api/security/user/${admin.id}/password`)
      .type("form")
      .send({
        password: "differentpassword"
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body);
        done();
      });
  });

  it("should return 200", function(done) {
    api
      .put(`/api/security/user/${admin.id}/password`)
      .type("form")
      .send({
        password: "admin"
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body);
        done();
      });
  });
});

describe("Search user", function() {
  const api = request.agent(app);

  before(login(api));
  after(logout(api));

  it("should return 200", function(done) {
    api
      .get(`/api/security/user/search/adm`)
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body);
        done();
      });
  });
});