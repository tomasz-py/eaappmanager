"use strict";

module.exports = function(Instance) {
  Instance.toRestart = function(id, cb) {
    Instance.find(
      {
        where: { id: id },
        fields: {
          description: false
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
    http: { path: "/services-torestart", verb: "get" }
  });
};
