const db = require("../db/connection");
const q = require("../db/query");
const app = require("../../app");
const request = require("supertest");
const chai = require("chai");

chai.use(require("chai-http"));
expect = chai.expect;

const { login, logout } = require("./auth.spec");

describe("Get Group by Id", function() {
  const api = request.agent(app);
  var admin = null;

  before(login(api));
  before(async () => {
    admin = await q(db).group.getByName("Admin");
  });

  after(logout(api));

  it("should return the right group", function(done) {
    api
      .get(`/api/security/group/${admin.id}`)
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body);
        done();
      });
  });
});

describe("Get Group Permissions", function() {
  const api = request.agent(app);
  var admin = null;

  before(login(api));
  before(async () => {
    admin = await q(db).group.getByName("Admin");
  });

  after(logout(api));

  it("should return a list of permissions", function(done) {
    api
      .get(`/api/security/group/${admin.id}/permission`)
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body);
        done();
      });
  });
});

describe("Get Permissions", function() {
  const api = request.agent(app);
  before(login(api));
  after(logout(api));

  it("should return a list of permissions", function(done) {
    api
      .get("/api/security/permission")
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body);
        done();
      });
  });
});

describe("Get Groups", function() {
  const api = request.agent(app);

  before(login(api));
  after(logout(api));

  it("should return a list of groups", function(done) {
    api
      .get(`/api/security/group`)
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body);
        done();
      });
  });
});

describe("Add a User to a Group twice", function() {
  const api = request.agent(app);
  var adminUser = null;

  before(async () => {
    adminUser = await q(db).user.getByName("admin");
    adminGroup = await q(db).group.getByName("Admin");
  });  
  before(login(api));
  after(logout(api));

  it("should return 500", function(done) {
    api
      .put(`/api/security/group/${adminGroup.id}/user/${adminUser.id}`)
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body);
        done();
      });
  });

});

