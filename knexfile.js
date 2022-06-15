/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: "mysql", // default port 3306
  connection: {
    host: "127.0.0.1",
    user: "bstn", // root
    password: "123456", // rootroot
    database: "bstn",
    charset: "utf8",
  },
};
