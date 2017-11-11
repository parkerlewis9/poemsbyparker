exports.up = function(knex, Promise) {
    return knex.schema.createTable("poems", function (table) {
        table.increments()
            .primary()

        table.string("title")
            .notNullable()

        table.timestamp("created_at")
            .defaultTo(knex.fn.now())
            .notNullable()

        table.timestamp("updated_at")
            .defaultTo(knex.fn.now())
            .notNullable()
    })
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("poems")
}
