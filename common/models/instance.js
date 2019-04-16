"use strict";

module.exports = function(Instance) {
  var app = require("../../server/server");

  //Get service id's to restart (status online and toRestart flag on true)
  Instance.toRestart = function(id, cb) {
    Instance.find(
      {
        where: { id: id },
        fields: {
          description: false,
          name: false,
          expirationDate: false,
          clientId: false,
          statusId: false,
          id: false
        },
        include: [
          {
            relation: "service",
            scope: {
              fields: { id: true },
              where: { toRestart: true, statusId: 1 }
            }
          }
        ]
      },
      cb
    );
  };
  Instance.remoteMethod("toRestart", {
    accepts: { arg: "id", type: "number", required: true },
    returns: { arg: "instance", type: "array" },
    description:
      "Return id's of services to restart (where toRestart is True and status is Online)",
    http: { path: "/services-torestart/:id", verb: "get" }
  });

  //Add information to queue after save or create instance
  Instance.observe("after save", function(ctx, next) {
    const Queue = app.models.Queue;
    //If new instance: add to queue information about create instance
    if (ctx.isNewInstance) {
      Queue.create(
        {
          tableName: "instance",
          itemId: ctx.instance.id,
          action: "Create",
          statusId: 3
        },
        function(err) {
          if (err) throw err;
        }
      );
    } else {
      //If update instance: add to queue information about update instance
      Queue.create(
        {
          tableName: "instance",
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
