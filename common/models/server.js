"use strict";

module.exports = function(Server) {
  //build-in User model require email. Below method to create random email
  Server.beforeRemote("create", function(context, user, next) {
    var req = context.req;
    req.body.email = Date.now() + "a@a.a";
    next();
  });
};
