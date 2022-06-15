/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: "mysql", // default port 3306
  connection: {
    host: "127.0.0.1",
    user: "root", // root
    password: "rootroot", // rootroot
    database: "lec_crud",
    charset: "utf8",
  },
};
