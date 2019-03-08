"use strict";

//module.exports = async function(server) {
module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get("/", server.loopback.status());
  server.use(router);
  //const datasource = server.datasources.eaappmanagerdb;
  //await datasource.autoupdate();
};
