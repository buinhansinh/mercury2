const db = require("../db/connection");
const q = require("../db/query");
const app = require("../../app");
const request = require("supertest");
const chai = require("chai");

chai.use(require("chai-http"));
expect = chai.expect;
assert = chai.assert;

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

const someuser = {
  name: "someuser",
  display_name: "Some User",
  password: "somepassword"
};

const admin = {
  name: "admin"
};

const insertUser = user => async () => {
  var ret = await q(db).user.insert(user);
  user.id = ret.id;
};

const getUser = user => async () => {
  var ret = await q(db).user.getByName(user.name);
  Object.assign(user, ret);
};

const deleteUser = user => async () => {
  const ret = await q(db).user.deleteById(user.id);
};

describe("Get user", function() {
  const api = request.agent(app);

  before(login(api));
  before(insertUser(someuser));
  after(deleteUser(someuser));
  after(logout(api));

  it("should return 2 users", function(done) {
    api
      .get("/api/security/user")
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body);
        expect(res.body.users).to.have.lengthOf(2);
        done();
      });
  });
});


describe("Update user", function() {
  const api = request.agent(app);

  before(login(api));
  before(insertUser(someuser));
  before(getUser(admin));
  after(deleteUser(someuser));
  after(logout(api));

  // update the user with the same name as itself
  it("should return 200", function(done) {
    api
      .put(`/api/security/user/${someuser.id}`)
      .type("form")
      .send({
        id: someuser.id,
        name: "someuser",
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
});

describe("Update user with a name conflict", function() {
  const api = request.agent(app);

  before(login(api));
  before(insertUser(someuser));
  before(getUser(admin));
  after(deleteUser(someuser));
  after(logout(api));

  // update the user to a different name but same as admin
  it("should return 409", function(done) {
    api
      .put(`/api/security/user/${someuser.id}`)
      .type("form")
      .send({
        id: someuser.id,
        name: "admin",
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
});

describe("Update user password", function() {
  const api = request.agent(app);

  before(login(api));
  before(getUser(admin));
  after(async () => {
    q(db).user.updatePassword(admin.id, "admin");
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
});

describe("Search users", function() {
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
