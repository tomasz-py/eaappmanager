"use strict";

module.exports = function(Service) {
  var app = require("../../server/server");

  //Add information to queue after save or create service
  Service.observe("after save", function(ctx, next) {
    const Queue = app.models.Queue;
    //If new service: add to queue information about create service
    if (ctx.isNewInstance) {
      Queue.create(
        {
          tableName: "service",
          itemId: ctx.instance.id,
          action: "Create",
          statusId: 3
        },
        function(err) {
          if (err) throw err;
        }
      );
    } else {
      //If update service: add to queue information about update service
      Queue.create(
        {
          tableName: "service",
          itemId: ctx.instance.id,
          action: "Update",
          statusId: 3
        },
        function(err) {
          if (err) throw err;
        }
      );
    }
    next();
  });
};
