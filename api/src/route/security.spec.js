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

function login(api) {
  return function(done) {
    api
      .post("/login")
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
      .get("/logout")
      .expect(200)
      .end(done);
  };
}

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

  // update the user
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
