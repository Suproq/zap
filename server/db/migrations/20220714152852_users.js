/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', function (table){
    table.increments('id');
    table.string('nickname', 255).notNullable;
    table.string('password', 255).notNullable;
    table.string('phone', 12).notNullable;
    table.integer('role', 4).notNullable;
    table.string('name', 255).notNullable;
    table.string('surname', 255);
    table.string('address', 255);
    table.boolean('darktheme').notNullable;
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
