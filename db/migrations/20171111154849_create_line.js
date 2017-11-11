exports.up = function(knex, Promise) {
    return knex.schema.createTable("lines", function (table) {
        table.increments()
            .primary()

        table.string("content")
            .notNullable()

        table.integer("poem_id")
            .unsigned()

        table.foreign("poem_id")
            .references("poems.id")

        table.timestamp("created_at")
            .defaultTo(knex.fn.now())
            .notNullable()

        table.timestamp("updated_at")
            .defaultTo(knex.fn.now())
            .notNullable()
    })
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("lines")
}
