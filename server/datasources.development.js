module.exports = {
  eaappmanagerdb: {
    host: process.env.DB_Host || "127.0.0.1",
    port: process.env.DB_port || 5432,
    url: process.env.DB_url || "",
    database: process.env.DB_database || "EAappManager",
    password: process.env.DB_password || "EAUserpass!",
    name: process.env.DB_name || "eaappmanagerdb",
    user: process.env.DB_user || "EAUser",
    connector: "postgresql"
  }
};
