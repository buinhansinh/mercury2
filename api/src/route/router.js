const express = require("express").Router();

const trycatch = func => (req, res, next) => func(req, res).catch(next);

class Router {
  get(path, func) {
    express.get(path, trycatch(func));
  }

  put(path, func) {
    express.put(path, trycatch(func));
  }

  post(path, func) {
    express.post(path, trycatch(func));
  }

  delete(path, func) {
    express.delete(path, trycatch(func));
  }

  route() {
    return express;
  }
}

module.exports = new Router();
