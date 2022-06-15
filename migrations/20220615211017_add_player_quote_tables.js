/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
    return knex.schema.createTable("player", (table) => {
      table.increments("id").unsigned().primary();
      table.string("name").notNullable();
      table.boolean("is_captain");
    }).createTable("quote", (table) => {
      table.increments("id").unsigned().primary();
      table.string("text").notNullable();
      table.integer("player_id").unsigned().references('id').inTable('player');
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable("quote").dropTable("player");
  };
  